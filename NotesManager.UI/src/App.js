import { useState } from "react";
import { Grid, GridItem, Heading } from '@chakra-ui/react'
import NoteViewer, { NoteViewerMode } from './components/NoteViewer';
import NotesList from './components/NotesList';
import Note from "./models/Note";

const notesDefault = [
  new Note(1, "Заметка 1", "asdfasdfasdf", new Date().getDate()),
  new Note(2, "Заметка 2", "werwerwerwerwerwer", new Date().getDate())
];

const App = () => {
  const [notes, setNotes] = useState(notesDefault);
  const [noteViewerMode, setNoteViewerMode] = useState(NoteViewerMode.View);
  const [selectedNote, setSelectedNote] = useState(notes[0]);

  const noteSelect = (note) => {
    setSelectedNote(note);
    setNoteViewerMode(NoteViewerMode.View);
  };

  const noteAdd = (newNote) => {
    setNotes(notes => [...notes, newNote]);
    noteSelect(newNote);
  };

  const noteSave = (changedNote) => {
    setNotes(notes => notes.map(note => 
      note.id === changedNote.id?
      {...changedNote}
      :
      {...note}
      ));
  };

  const noteDelete = (id) => {
    setNotes(notes => notes.filter(note => note.id !== id));
    const notesCount = notes.length;
    if (notesCount > 0) {
      setSelectedNote(notes[notesCount-1]);
    }
  };

  return (
      <Grid templateColumns='repeat(6, 1fr)' bg='gray.100' h='100vh'>
        <GridItem as='aside' colSpan='1' bg='green.200' p='10px'>
          <NotesList notes={notes} noteSelect={noteSelect} setNoteViewerModeAdd={()=>setNoteViewerMode(NoteViewerMode.Add)} />
        </GridItem>
        <GridItem as='main' colSpan='5' p='10px'>
          {notes.length ?
            <NoteViewer mode={noteViewerMode} note={selectedNote} noteSave={noteSave} noteDelete={noteDelete} noteAdd={noteAdd} />
            :
            <Heading as='h1'>Заметки отсутсвуют</Heading>
          }
        </GridItem>

      </Grid >
  );
}

export default App;
