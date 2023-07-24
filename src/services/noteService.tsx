import { list } from '../constants/constants';

export const createNote = async (noteData: any) => {
  try {
    // Simulating API call delay with setTimeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Push the noteData into the list array
    list.push(noteData);
    return [...list];
  } catch (error) {
    console.error('Failed to create note:', error);
    throw new Error('Failed to create note.');
  }
};

export const searchByTitle = async (title:any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const searchResults = list.filter((note) =>
    note.title.toLowerCase().includes(title.toLowerCase())
  );
  return searchResults;
};


export const editNote: any = async (noteData: any) => {
  try {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find the index of the note in the list array
    const noteIndex = list.findIndex((note) => note.id === noteData.id);

    // If the note is found, update its title and body
    if (noteIndex !== -1) {
      list[noteIndex].title = noteData.title;
      list[noteIndex].body = noteData.body;
    }
  } catch (error) {
    console.error('Failed to edit note:', error);
    throw new Error('Failed to edit note.');
  }
};



export const deleteNote = async (noteId: number) => {
  try {
    // Find the index of the note in the list array
    const noteIndex = list.findIndex((note) => note.id === noteId);

    // If the note is found, remove it from the list
    if (noteIndex !== -1) {
      list.splice(noteIndex, 1);
    }

    // Return the updated list after deletion
    return [...list];
  } catch (error) {
    console.error('Failed to delete note:', error);
    throw new Error('Failed to delete note.');
  }
};

export const getAllNotes = async () => {
  try {
    // Simulating API call delay with setTimeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return a copy of the list array
    return [...list];
  } catch (error) {
    console.error('Failed to get all notes:', error);
    throw new Error('Failed to get all notes.');
  }
};

export const getNote: any = (id: number) => {
  try {
    // Find the note with the specified ID in the list array
    const note = list.find((note) => note.id == id);

    if (note) {
      return note;
    } else {

      return null;
    }
  } catch (error) {
    console.error('Failed to retrieve note:', error);
    throw new Error('Failed to retrieve note.');
  }
};
