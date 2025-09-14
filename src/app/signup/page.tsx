"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUppage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSignUp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("Signun success : ", res.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed.");
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (
      user.username.length > 3 &&
      user.email.length > 5 &&
      user.password.length > 3
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />

      {/* Username field : */}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="p-2 border border-gray-300 bg-white rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      {/* Email field : */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 border border-gray-300 bg-white rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      {/* Password field : */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-2 border bg-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      {/* Submit button : */}
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignUp}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>

      <Link href={"/login"}>Visit login page</Link>
    </div>
  );
}
