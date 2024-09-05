import { IoMdClose } from "react-icons/io";

 const Delete = ({
    setShowDeletePopup,
    deleteNote,
  }: {
    setShowDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
    deleteNote: () => Promise<void>;
  }) => {
    return (
      <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white py-6 px-4 rounded-md w-[90%] mx-auto sm:w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-black font-bold">Delete Note ?</h1>
            <button
              className="text-black"
              onClick={() => setShowDeletePopup(false)}
            >
              <IoMdClose size={22} className="text-black" />
            </button>
          </div>
          <div>
            <button
              className="text-red-500 px-3 py-1 text-sm border rounded-md"
              onClick={deleteNote}
            >
              Delete
            </button>
            <button
              className="text-blue-500 px-3 py-1 text-sm border rounded-md"
              onClick={() => setShowDeletePopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    );
  };

  export default Delete;