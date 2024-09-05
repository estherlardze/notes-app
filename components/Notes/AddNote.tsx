import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "@/lib/utils";


const NoteForm = ({
  setShowPopup,
  fetchAllNotes,
}: {
  fetchAllNotes: () => void;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");

  const addNotes = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title && tag && description) {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/`,
          {
            title,
            tag,
            description,
          }
        );
        setShowPopup(false);
        fetchAllNotes();
      } catch (error) {
        console.error("Error adding note: ", error);
      }
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white py-6 px-4 rounded-md w-[90%] mx-auto sm:w-full max-w-lg max-h-[90vh] overflow-y-scroll hide-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-black font-bold">Add Note</h1>
          <button className="text-black" onClick={() => setShowPopup(false)}>
            <IoMdClose size={22} className="text-black" />
          </button>
        </div>
        <form onSubmit={addNotes}>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="w-full px-3 py-1 rounded-md text-black border border-black/50 outline-none"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="tag">
              Tag
            </label>
            <select
              className="w-full px-3 py-1 rounded-md text-black border border-black/50 outline-none"
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a tag
              </option>
              <option value="Home">Home</option>
              <option value="Business">Business</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="description">
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
            />
          </div>
          <button
            className="bg-green-600 font-bold w-full px-4 py-2 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default NoteForm;
