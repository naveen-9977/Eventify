"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  // Renamed state from 'name' to 'mobileNumber'
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const getMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  async function sendRequest() {
    // Send 'mobileNumber' to the API
    let res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ mobileNumber, password }),
    });

    if (res.ok) { // Check for successful status (e.g., 200)
        setTimeout(() => {
            router.push("/admin");
        }, 1000); // Reduced delay for better user experience
    } else {
        alert("Invalid credentials. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-black">
      <div className="absolute top-0 left-0 h-full w-full z-40">
        <img src="/login.png" alt="" className="w-full h-full object-cover opacity-20" />
      </div>
      <div className="md:px-4 z-50">
        <div className="container m-auto px-4 md:px-0">
          <div className="Heading font-bold text-center text-2xl mt-4 md:mt-8 text-white md:text-3xl">
            Admin Login
          </div>
        </div>
      </div>
      <div className="w-full max-w-sm p-6 z-50 text-white">
        <div className="flex flex-col gap-5">
          {/* Updated input for Mobile Number */}
          <div className="mobile">
            <label htmlFor="mobile" className="block mb-2">
              Mobile Number
            </label>
            <input
              type="tel" // Use type 'tel' for mobile numbers
              name="mobile"
              id="mobile"
              className="w-full px-3 py-2 outline-fuchsia-500 outline-1 ring-1 rounded-md ring-neutral-400 text-zinc-900"
              value={mobileNumber}
              onChange={getMobileNumber}
            />
          </div>
          <div className="password">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 outline-fuchsia-500 outline-1 ring-1 rounded-md ring-neutral-400 text-zinc-900"
              value={password}
              onChange={getPassword}
            />
          </div>
          <button
            className="text-white px-4 py-2 rounded-md bg-fuchsia-500 hover:bg-fuchsia-500/90 w-full font-semibold"
            onClick={sendRequest}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}