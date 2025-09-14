"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verfied, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
      router.push("/login");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-4">
      <h1 className="text-4xl">Verify Email</h1>

      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>

      {verfied && (
        <div>
          <h2>Verified</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}

      <button
        className="bg-green-600 py-3 px-6 rounded-2xl cursor-pointer hover:bg-green-800"
        onClick={verifyUserEmail}
      >
        Verify
      </button>
    </div>
  );
}
