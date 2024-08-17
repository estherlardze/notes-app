import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const NoteForm = ({ setShowPopup }: any) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, tag, description });
    setShowPopup(false);
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white py-6 px-4 rounded-md w-[90%] mx-auto sm:w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-black font-bold">Add Note</h1>
          <button className="text-black" onClick={() => setShowPopup(false)}>
            <IoMdClose size={22} className="text-black" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
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
              <option value="work">Home</option>
              <option value="personal">Business</option>
              <option value="urgent">Personal</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 rounded-md text-black border border-black/50 outline-none"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            ></textarea>
          </div>
          <button
            className="bg-green-600 font-bold  w-full px-4 py-2 rounded-md"
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
