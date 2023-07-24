import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../services/noteService";
import { Note } from "../interfaces/interface";

const NoteDetails: React.FC<any> = () => {
  const navigation = useNavigate();
  const [noteDetails, setNoteDetails] = useState<Note | null>(null);
  const [id, setId] = useState<number | null>(null);
  const { id: noteIdParam } = useParams<{ id: string }>();

  const fetchDetail = async () => {
    try {
      const res = await getNote(id!);
      setNoteDetails(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    navigation("/");
  };

  useEffect(() => {
    setId(Number(noteIdParam));
  }, [noteIdParam]);

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  return (
    <>
      <div className="max-w-xs mt-5 md:max-w-lg mx-auto">
      <button className="bg-blue-500 hover:bg-blue-700 flex items-center text-white font-bold py-2 px-4 rounded" onClick={handleBackClick}>
        <FaArrowLeft /> Back
      </button>
      <div className="my-4">
        <h2 className="text-lg text-center font-bold">Note Details</h2>
        <div className="mb-8"><span className="font-bold">Title:</span> <p className="md:ml-8">{noteDetails?.title}</p></div>
        <div><span className="font-bold">Description:</span> <p className="md:ml-8">{noteDetails?.body}</p></div>
      </div>
      </div>
    </>
  );
};

export default NoteDetails;
