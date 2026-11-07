
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const { name, email, password } = userDetails;

    if (!name || !email || !password) {
      toast.error("Please fill the Form Completly!!!");
    } else {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      console.log(res);

      const serverResponse = await res.json();

      if (res.status == 201) {
        toast.success(serverResponse.message);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(serverResponse.message);
      }

      setUserDetails({ name: "", email: "", password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-green-500 p-5 rounded w-100">
        <h1 className="text-2xl font-bold text-white">Note Hub</h1>

        <p className="text-white">
          Note Everything You Need to remember!!
        </p>

        <h3 className="text-white font-bold">Register...</h3>

        <form onSubmit={handleRegister}>
          <div className="mt-5 mb-3 w-full">
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              type="text"
              placeholder="Name"
              className="rounded bg-gray-100 p-3 w-full"
            />
          </div>

          <div className="mb-3 w-full">
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              type="email"
              placeholder="Email"
              className="rounded bg-gray-100 p-3 w-full"
            />
          </div>

          <div className="mb-3 w-full">
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              className="rounded bg-gray-100 p-3 w-full"
            />
          </div>

          <div className="mb-3 flex items-center">
            <button
              type="submit"
              className="bg-green-600 rounded px-3 py-2 text-white"
            >
              Register
            </button>

            <span className="ms-5 text-sm text-white">
              Already a User? Click{" "}
              <Link href="/login" className="underline text-green-800">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
