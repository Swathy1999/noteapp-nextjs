"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Keep your existing imports for icons, Link and toast.

function UpdateNoteContent() {
  const { status } = useSession();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [noteDetails, setNoteDetails] = useState({
    title: "",
    description: "",
    color: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status == "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status !== "authenticated" || !id) return;

    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`);

        if (!response.ok) {
          toast.error("Failed to fetch note");
          router.push("/notes");
          return;
        }

        const data = await response.json();

        setNoteDetails({
          title: data.title || "",
          description: data.description || "",
          color: data.color || "",
        });
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [status, id, router]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteDetails),
      });

      if (!response.ok) {
        toast.error("Failed to update note");
        return;
      }

      toast.success("Note updated successfully");
      router.push("/notes");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (status == "loading" || loading) {
    return <p>Loading...</p>;
  }

  if (status !== "authenticated") return null;

  // KEEP YOUR EXISTING JSX FORM AND UI HERE.
  // Use noteDetails.title, noteDetails.description and noteDetails.color.
  // Update fields using setNoteDetails.
}

export default function UpdateNote() {
  return (
    <Suspense fallback={<p>Loading note...</p>}>
      <UpdateNoteContent />
    </Suspense>
  );
}