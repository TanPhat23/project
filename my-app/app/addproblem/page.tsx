"use client";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../lib/firebase/firebase";
export default function AddProblems() {
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const newProblem = {
      ...inputs,
      order: Number(inputs.order),
    };
    e.preventDefault();
    await setDoc(doc(firestore, "problems", inputs.id), inputs);
    alert("save to db");
  };
  return (
    <div>
      <form
        className="p-6 flex flex-col w-1/6 outline-1 outline-gray-300"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="problem id"
          name="id"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="title"
          name="title"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="difficulty"
          name="difficulty"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="category"
          name="category"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="order"
          name="order"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="videoId?"
          name="videoId"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="link?"
          name="link"
        />
        <button className="bg-gray-600">Save to DB</button>
      </form>
    </div>
  );
}
