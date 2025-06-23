"use client";

import React, { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [response, setResponse] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", form.email);
    data.append("password", form.password);
    data.append(
      "profile",
      JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        bio: form.bio,
      })
    );

    if (imageFile) {
      data.append("image", imageFile); // your `fileInput.files[0]` logic
    }

    try {
      const res = await fetch("https://ecom-testing.up.railway.app/auth/register", {
        method: "POST",
        body: data,
      });

      const result = await res.text(); 
      setResponse(result);
    } catch (error) {
      setResponse("Error: " + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-md mx-auto p-6 bg-white shadow rounded border border-gray-300">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleInputChange}
        className="w-full mb-3 p-2 border rounded border-gray-300"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleInputChange}
        className="w-full mb-3 p-2 border rounded border-gray-300"
        required
      />

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleInputChange}
        className="w-full mb-3 p-2 border rounded border-gray-300"
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleInputChange}
        className="w-full mb-3 p-2 border rounded border-gray-300"
        required
      />

      <textarea
        name="bio"
        placeholder="Bio"
        value={form.bio}
        onChange={handleInputChange}
        className="w-full mb-3 p-2 border rounded border-gray-300"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-4"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Submit
      </button>

      <pre className="mt-4 bg-gray-100 p-2 rounded text-sm overflow-auto whitespace-pre-wrap">
        {response}
      </pre>
    </form>
  );
}
