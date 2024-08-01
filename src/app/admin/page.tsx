// src/app/admin/page.tsx

"use client";

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { getAuth, signInAnonymously } from "firebase/auth";
import { firebaseSDK } from "@/services/firebase";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth(firebaseSDK);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (username === "admin" && password === "admin") {
      try {
        await signInAnonymously(auth);
        router.push("/admin");
      } catch (error) {
        setError("Failed to sign in anonymously");
        console.error("Error signing in anonymously:", error);
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Head>
        <title>Admin Login</title>
      </Head>
      <div className="max-w-md w-full py-20 px-10 bg-white rounded-3xl shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center mb-8">Admin Login</h2>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
