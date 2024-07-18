"use client";
import { useState } from "react";
import { toDoList } from "@/utils/data";
import NoteCard from "@/app/components/NoteCard";
import { FaPlus } from "react-icons/fa6";

type NoteProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  tag: string;
};

const titles = ["All", "Home", "Business", "Personal"];

export default function Home() {
  const [border, setBorder] = useState("All");
  const [notes, setNotes] = useState(toDoList);
  const [showCompleted, setShowCompleted] = useState(false);

  const menuItems = titles.map((value) => value)

  const filteredData = (tag: string, title: string) => {
    if (tag === "All") {
      setNotes(toDoList);
    } else {
      const newData = toDoList.filter((note) => note.tag === tag);
      setNotes(newData);
    }
    setBorder(title);
  };


  return (
    <main className="w-[90%] mx-auto 2xl:w-[60%] overflow-hidden">
      <h1 className="font-bold my-3">Your Notes</h1>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <article className="flex gap-6 border-b-2 border-black/10">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => filteredData(item, item)}
              className={`border-b-2 ${
                border === item ? "border-blue-600 text-blue-600" : "text-gray-700"
              } uppercase text-sm font-semibold `}
            >
              {item}
            </button>
          ))}
        </article>

        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={showCompleted}
          />
          <label htmlFor="checkbox" className="text-sm">
            Show all completed notes
          </label>
        </div>
      </div>

      <section className="grid grid-cols-6 mt-4 gap-4">
        {notes.map((note: NoteProps) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </section>

      <button className="fixed right-4 bottom-8 bg-blue-500 p-3 rounded-full">
        <FaPlus size={25} className="text-white" />
      </button>
    </main>
  );
}
