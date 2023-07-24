import React, { useState, useCallback } from "react";
import { createNote } from "../services/noteService";
import { Note, NoteFormProps } from "../interfaces/interface";

const initialState: Note = {
  id: 0,
  title: "",
  body: "",
};

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, setShowModal,  setLoading}) => {
  const [note, setNote] = useState(initialState);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!note.title || !note.body) return;
      setLoading(true);
      await createNote({
        ...note,
        id: Math.random(),
      });
      setNote(initialState);
      setShowModal(false);
      setLoading(false);
      if (onSubmit) onSubmit(note);
    },
    [note, onSubmit, setShowModal]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='title-input'
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
        aria-label="title"
      />
      <textarea
        className='description-input'
        name="body"
        placeholder="Body"
        value={note.body}
        onChange={handleChange}
        aria-label="body"
      ></textarea>
      <button className='save-note' type="submit">Save</button>
    </form>
  );
};

export default NoteForm;
