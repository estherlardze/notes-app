"use client";

import { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import { FaPlus } from "react-icons/fa6";
import NoteForm from "./AddNote";
import axios from "axios";

type NoteProps = {
  _id: string;
  title: string;
  description: string;
  tag: "Home" | "Business" | "Personal";
  createdAt: string;
};

const titles = ["All", "Home", "Business", "Personal"];
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function AllNotes() {
  const [border, setBorder] = useState("All");
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [allNotes, setAllNotes] = useState<NoteProps[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const menuItems = titles.map((value) => value);

  const filteredData = (tag: string, title: string) => {
    if (tag === "All") {
      setNotes(allNotes);
    } else {
      const newData = allNotes.filter((note) => note.tag === tag);
      setNotes(newData);
    }
    setBorder(title);
  };

  const fetchAllNotes = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/notes/`);
      setNotes(data);
      setAllNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  console.log("notes", notes);

  return (
    <main className="w-[90%] mx-auto 2xl:w-[60%] mt-4 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center my-2">
        <article className="flex gap-6 border-b-2 border-black/10">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => filteredData(item, item)}
              className={`${
                border === item
                  ? "border-blue-600 border-b-2 text-blue-600"
                  : "text-gray-700"
              } uppercase text-sm font-semibold `}
            >
              {item}
            </button>
          ))}
        </article>

          <button
            className=" bg-blue-500 p-1 px-2 text-white rounded-sm flex items-center gap-2"
            onClick={() => setShowPopup(true)}
          >
            <span className="">Add Note</span>
            <FaPlus  />
          </button>
        </div>

      <section className="grid grid-cols-8 mt-4 gap-2">
        {notes.map((note: NoteProps) => (
          <NoteCard note={note} key={note._id} fetchAllNotes={fetchAllNotes} />
        ))}
      </section>

      {showPopup && <NoteForm setShowPopup={setShowPopup} fetchAllNotes={fetchAllNotes}/>}
    </main>
  );
}
