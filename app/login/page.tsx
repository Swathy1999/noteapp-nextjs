
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { email, password } = userDetails;

    if (!email || !password) {
      toast.error("Please fill the Form Completly!!!");
    } else {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);

      if (res?.ok) {
        toast.success("Login Successfull");

        setTimeout(() => {
          window.location.href = "/notes";
        }, 2000);
      } else {
        toast.error("invalid Credentials");
      }

      setUserDetails({ email: "", password: "" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-500">
            Note Hub
          </h1>

          <p className="text-gray-500 mt-2">
            Note Everything You Need to Remember!!
          </p>
        </div>

        <div className="space-y-5">
          <form >
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    email: e.target.value,
                  })
                }
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>

              <input
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    password: e.target.value,
                  })
                }
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
              />
            </div>

            <button
              type="submit"
              onClick={handleLogin}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
            >
              Login
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-gray-600">
          New User?
          <Link
            href="/register"
            className="text-green-600 font-semibold hover:text-green-700 hover:underline"
          >
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
}
