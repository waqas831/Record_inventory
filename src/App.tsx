import { Modal, Box } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation  } from 'react-router-dom';
import NoteDetails from './components/NoteDetails';
import NoteForm from './components/NoteForm';
import NoteList from './components/NotesList';
import { list } from './constants/constants';
import { searchByTitle } from './services/noteService';
import Loader from './utils/Loader';
import SearchIcon from '@mui/icons-material/Search';

interface Note {
  id: number;
  title: string;
  body: string;
}

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




const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(list);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');

  const location = useLocation();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  


  const handleAddNoteClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSearchNoteClick = async () => {
    if (!searchTerm.length) return;
    setLoading(true); // Set loading state to true before the search
    const res: any = await searchByTitle(searchTerm)
    setNotes(res)
    setLoading(false); // Set loading state to true before the search
  };

  const handleSearchInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyDown = async (event: any) => {
    if (((event.key == 'Backspace' || event.key == 'Delete') && !event.target.value.length) || (event.key === 'Enter' && event.target.value.length)) {
      setLoading(true); // Set loading state to true before the search
      const res: any = await searchByTitle(searchTerm)
      setNotes(res)
      setLoading(false); // Set loading state to true before the search
    }
  };

  return (
    <React.Fragment>
      <div className='app-home'>
        <h1 className='heading text-3xl'>Note Manager</h1>
        <button className='add-note my-4 md:my-0' onClick={handleAddNoteClick}>Add Note</button>
       {currentRoute  === '/' && (
        <div className='max-w-xs mx-auto md:max-w-md relative'>
          <input placeholder='Search' className="search shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={searchTerm} onChange={handleSearchInputChange} onKeyUp={handleSearchKeyDown} />
          <SearchIcon className='absolute top-2 right-3' onClick={handleSearchNoteClick} />
        </div>
       )}
        {loading && (
          <Loader />
        )}
        <Routes>
          <Route path="/" element={<NoteList notes={notes} setNotes={setNotes} setLoading={setLoading} />} />
          <Route path="/note/:id" element={<NoteDetails />} />
        </Routes>
        <Modal open={showModal} onClose={handleModalClose}>
          <Box sx={style}>
            <h3 className="text-3xl font-bold">Add new note</h3>
            <NoteForm setShowModal={setShowModal} setLoading={setLoading} />
          </Box>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default App;
