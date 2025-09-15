"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [data, setData] = useState("Nothing Yet");

  const router = useRouter();

  const getUserDetails = async () => {
    const res = await axios.post("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success("Logout success.");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-4">
      <h1>Profile page</h1>
      <hr />
      <h2>
        {data === "Nothing Yet" ? (
          "Nothing Yet"
        ) : (
          <Link
            href={`/profile/${data}`}
            className="bg-orange-500 p-2 rounded-lg"
          >
            {data}
          </Link>
        )}
      </h2>
      <hr />

      <button
        className="bg-blue-600 py-3 px-6 rounded-xl cursor-pointer"
        onClick={getUserDetails}
      >
        Get User Details
      </button>

      <button
        className="bg-red-500 py-3 px-6 rounded-xl cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
