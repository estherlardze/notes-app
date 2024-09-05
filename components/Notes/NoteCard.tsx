import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import UpdateNote from "./UpdateNote";
import Delete from "./DeleteNote";

export type NoteProps = {
  _id: string; 
  title: string;
  description: string;
  tag: string;
  createdAt: string;
};

const NoteCard = ({ note, fetchAllNotes }: { note: NoteProps; fetchAllNotes: () => void }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleBgColor = () => {
    if (note.tag === "Business") {
      return "bg-green-500";
    } else if (note.tag === "Personal") {
      return "bg-red-400";
    } else {
      return "bg-blue-400";
    }
  };

  const deleteNote = async () => {    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/${note._id}`);
      fetchAllNotes();
      setShowDeletePopup(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };


  return (
    <div className="bg-white rounded-md border border-gray-300 col-span-8 sm:col-span-4 lg:col-span-2 m-1 p-2 h-fit">
      <div className="flex justify-between items-center mb-2">
        <button
          className={`${handleBgColor()} text-white px-3 py-1 text-sm border rounded-md`}
        >
          {note.tag}
        </button>
        <div className="flex gap-2 items-center">
          <button onClick={() => setShowUpdateForm(true)}>
            <MdEdit className="text-gray-700" />
          </button>
          <button onClick={() => setShowDeletePopup(true)}>
            <MdDelete className="text-gray-700" />
          </button>
        </div>
      </div>
      <h1 className="font-bold text-[22px] my-2 text-gray-700">{note.title}</h1>
      <div className="text-sm my-4 text-wrap" dangerouslySetInnerHTML={{ __html: note.description }} />
      <p className="text-xs text-gray-500">{`${new Date(note.createdAt).toISOString().split("T")[0]}`}</p>

      {showDeletePopup && (
        <Delete setShowDeletePopup={setShowDeletePopup} deleteNote={deleteNote} />
      )}

      {showUpdateForm && (
        <UpdateNote setShowUpdateForm={setShowUpdateForm} fetchAllNotes={fetchAllNotes} note={note} />
      )}
    </div>
  );
};

export default NoteCard;
