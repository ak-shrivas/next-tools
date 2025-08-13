"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("admin", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-32">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
        placeholder="Enter admin password"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </div>
  );
}
