"use client";

import { FaCheck } from "react-icons/fa";
import { FaNoteSticky, FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function UpdateNote() {
  const { status } = useSession();
  const [noteDetails, setNoteDetails] = useState({
    _id: "",
    title: "",
    description: "",
    color: "",
    createdAt: "",
    userMail: "",
    updatedAt: "",
  });
  console.log(noteDetails);
  const { id } = useParams();
  useEffect(() => {
    viewNote();
  }, [id]);
  const viewNote = async () => {
    const res = await fetch(`/api/notes/${id}`);
    const serverResponse = await res.json();
    // console.log(serverResponse);
    setNoteDetails(serverResponse);
  };

  const handleUpdate = async () => {
    const { title, description, color } = noteDetails;
    if (!title || !description || !color) {
      toast.error("Please fill the form Completly!!");
    } else {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(noteDetails),
      });
      if (res.status == 200) {
        toast.success("Note Updated Successfully");
        redirect(`/notes`);
      }
    }
  };
  if (status == "loading") {
    return <p className="text-center mt-10 text-2xl">Loading....</p>;
  }
  if (status == "unauthenticated") {
    redirect("/login");
  }
  return (
    <div className="md:mx-40 m-5">
      <div className="mb-10 flex justify-between items-center">
        <Link
          href={`/notes`}
          className="text-xl flex items-center text-blue-300"
        >
          <FaNoteSticky />
          <span className="ms-2">NoteApp</span>
        </Link>
      </div>
      <div className="flex items-center justify-center md:mt-20 mt-5">
        <div className="border border-gray-200 p-5 rounded w-full md:w-100">
          <h2 className="text-2xl font-bold text-blue-400">NoteApp</h2>

          <p className="text-gray-600">Edit notes</p>

          <div className="my-5 flex justify-between items-center">
            <button onClick={viewNote} className="font-bold text-4xl">
              <FaXmark />
            </button>

            <button
              onClick={handleUpdate}
              className="bg-red-400 rounded-xl text-white px-2 flex items-center"
            >
              Update
              <FaCheck className="ms-2" />
            </button>
          </div>

          <div className="flex my-7">
            <h3 className="text-sm text-gray-300">Theme</h3>

            <div className="flex justify-evenly items-center w-full my-3">
              <div
                onClick={() =>
                  setNoteDetails({ ...noteDetails, color: "yellow" })
                }
                className={
                  noteDetails.color == "yellow"
                    ? "p-2 bg-yellow-300 w-5 h-5 border rounded-full cursor-pointer"
                    : "p-2 bg-yellow-300 w-5 h-5 rounded-full cursor-pointer"
                }
              ></div>

              <div
                onClick={() => setNoteDetails({ ...noteDetails, color: "red" })}
                className={
                  noteDetails.color == "red"
                    ? "p-2 bg-red-300 w-5 h-5 border rounded-full cursor-pointer"
                    : "p-2 bg-red-300 w-5 h-5 rounded-full cursor-pointer"
                }
              ></div>

              <div
                onClick={() =>
                  setNoteDetails({ ...noteDetails, color: "green" })
                }
                className={
                  noteDetails.color == "green"
                    ? "p-2 bg-green-300 w-5 h-5 border rounded-full cursor-pointer"
                    : "p-2 bg-green-300 w-5 h-5 rounded-full cursor-pointer"
                }
              ></div>

              <div
                onClick={() =>
                  setNoteDetails({ ...noteDetails, color: "blue" })
                }
                className={
                  noteDetails.color == "blue"
                    ? "p-2 bg-blue-300 w-5 h-5 border rounded-full cursor-pointer"
                    : "p-2 bg-blue-300 w-5 h-5 rounded-full cursor-pointer"
                }
              ></div>
            </div>
          </div>

          <div className="mt-5 mb-3 w-full">
            <input
              value={noteDetails.title}
              onChange={(e) =>
                setNoteDetails({ ...noteDetails, title: e.target.value })
              }
              type="text"
              placeholder="Title"
              className="rounded p-3 w-full"
            />
          </div>
          <div className="mb-3 w-full">
            <textarea
              rows={5}
              value={noteDetails.description}
              onChange={(e) =>
                setNoteDetails({ ...noteDetails, description: e.target.value })
              }
              placeholder="Description"
              className="rounded p-2 w-full"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
