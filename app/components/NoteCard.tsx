import React from "react";
import {
  MdEdit,
  MdOutlineCheckBoxOutlineBlank,
  MdDelete,
} from "react-icons/md";

type NoteProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  tag: string;
};

const NoteCard = ({ note }: { note: NoteProps }) => {
  const handleBgColor = () => {
    if (note.tag === "Business") {
      return "bg-green-500";
    } else if (note.tag === "Personal") {
      return "bg-red-400";
    } else {
      return "bg-blue-400";
    }
  };

  return (
    <div className="bg-primary rounded-md col-span-6 sm:col-span-3 lg:col-span-2 m-2 p-4">
      <div className="flex justify-between items-center mb-2">
        <button
          className={`${handleBgColor()} text-white px-3 py-1 text-sm border rounded-md`}
        >
          {note.tag}
        </button>
        <div className="flex gap-2 items-center">
          <MdOutlineCheckBoxOutlineBlank className="text-gray-700" />
          <MdEdit className="text-gray-700" />
          <MdDelete className="text-gray-700" />
        </div>
      </div>
      <h1 className="font-bold text-[22px] my-2 text-gray-700">{note.title}</h1>
      <p className="text-sm my-4 text-wrap">
        {note.description.length > 70
          ? note.description.substring(0, 70) + "..."
          : note.description}
      </p>
      <p className="text-xs text-gray-500">{note.date}</p>
    </div>
  );
};

export default NoteCard;
