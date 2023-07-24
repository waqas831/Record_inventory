import { deleteNote, editNote, getAllNotes } from "../services/noteService";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import { Modal, Box } from "@mui/material";
import "../styles/note.css";
import NoteEdit from "./NoteEdit";
import { Note, NoteListProps, NoteState } from "../interfaces/interface";

const NoteList: React.FC<NoteListProps> = ({ notes, setNotes,setLoading }) => {
  const [noteState, setNoteState] = useState<NoteState>({
    showModal: false,
    selectedNote: null,
    editedTitle: "",
    editedBody: "",
  });

  const handleEditClick = (note: Note) => {
    setNoteState({
      ...noteState,
      selectedNote: note,
      editedTitle: note.title,
      editedBody: note.body,
      showModal: true,
    });
  };
  
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const handleDeleteClick = async (id: number) => {
    setLoading(true);
    const res = await deleteNote(id);
    if (res) {
      const notes = await getAllNotes();
      setNotes(notes);
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setNoteState({
      ...noteState,
      showModal: false,
    });
  };

  return (
<>
    {
      !notes.length ?  <p className="text-center mt-8 font-bold">No results found.</p>: <div className='container'>
      {notes.map(({ id, title, body }: any) => (
        <div key={id} className="card">
          <Link to={`/note/${id}`} className='link-wrapper'>
            <h2 className='title text-2xl'>{title}</h2>
            <p className='description mt-4'>{body}</p>
          </Link>
          <div className='edit-delete-wrapper'>
            <RiEdit2Line
              size={20}
              onClick={() => handleEditClick({ id, title, body })}
              style={{ cursor: "pointer" }}
              className='edit-icon'
            />
            <RiDeleteBin2Line
              size={20}
              onClick={() => handleDeleteClick(id)}
              style={{ cursor: "pointer" }}
              className='delete-icon'
            />
          </div>
        </div>
      ))}
      <Modal open={noteState.showModal} onClose={handleModalClose}>
        <Box sx={style}>
          {noteState.selectedNote && (
            <NoteEdit
            note={noteState.selectedNote}
              setNotes={setNotes}
              onCancel={handleModalClose}
              setLoading={setLoading}
              />
              )}
        </Box>
      </Modal>
    </div>
    }
    
    
              </>
  );
};

export default NoteList;
