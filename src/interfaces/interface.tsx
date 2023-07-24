export interface Note {
  id: number;
  title: string;
  body: string;
}

export interface NoteState {
  showModal: boolean;
  selectedNote: Note | null;
  editedTitle: string;
  editedBody: string;
}

export interface NoteListProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setLoading: (loading: boolean) => void;
}

export interface NoteEditProps {
  note: any;
  setNotes: any;
  onCancel: () => void;
  setLoading: (loading: boolean) => void;
}

export interface NoteDetailsProps {
  noteId: number;
}

export interface NoteFormProps {
  onSubmit?: (note: Note) => void;
  setShowModal: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
}
