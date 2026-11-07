"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  FaStickyNote,
  FaUser,
  FaPowerOff,
  FaClock,
  FaTrash,
  FaPen,
  FaPlus,
} from "react-icons/fa";

interface Note {
  _id: string;
  title: string;
  description: string;
  color: string;
  createdAt: string;
  userMail: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [allNotes, setAllNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (status == "authenticated") {
      fetchNotes();
    }
  }, [status]);

  const fetchNotes = async () => {
    try {
      const res = await fetch(`/api/notes?email=${session?.user?.email}`);

      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }

      const serverResponse = await res.json();
      setAllNotes(serverResponse);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id: string) => {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    toast.success("Note Removed Successfully");
  };
  fetchNotes();

  if (status == "loading") {
    return <p className="text-center mt-10 text-2xl">Loading....</p>;
  }

  if (status == "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sky-500 text-2xl font-semibold">
            <FaStickyNote />
            <span>Note Hub</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <FaUser />
              <span className="font-medium">{session?.user?.name}</span>
            </div>

            <button
              className="text-red-500 hover:text-red-600"
              onClick={() => signOut()}
            >
              <FaPowerOff size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-8 bg-white p-8 rounded shadow">
        <h1 className="text-5xl font-bold text-blue-600 mb-10">My Notes</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allNotes.length > 0 &&
            allNotes.map((note) => (
              <div
                key={note?._id}
                className={`bg-${note?.color}-300 rounded-lg p-5 shadow hover:scale-105 transition duration-300`}
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">{note?.title}</h2>

                  <Link href={`/notes/${note?._id}`}>
                    <FaPen className="text-gray-700 hover:text-black" />
                  </Link>
                </div>

                <p className="mt-4 text-gray-700">{note?.description}</p>

                <div className="flex justify-between items-center mt-10">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FaClock />
                    {new Date(note?.createdAt).toLocaleDateString()}
                  </div>

                  <button onClick={() => deleteNote(note?._id)}>
                    <FaTrash className="text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </div>
            ))}

          <Link href="/notes/add">
            <button className="border-2 border-dashed border-gray-400 rounded-lg h-56 w-full flex flex-col justify-center items-center hover:bg-gray-50 hover:border-blue-500 transition">
              <FaPlus size={28} />

              <p className="mt-4 text-lg font-medium">New Note</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
