import { useState, useEffect } from "react";
import { Grid, GridItem, Heading } from '@chakra-ui/react'
import NoteViewer, { NoteViewerMode } from './components/NoteViewer';
import NotesList from './components/NotesList';
import { notesGet, noteCreate, noteUpdate, noteRemove } from './services/notesService.js';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteViewerMode, setNoteViewerMode] = useState(NoteViewerMode.Empty);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    notesGet().then(result => {
      setNotes(result);
      if (result.length > 0) {
        noteSelect(result[0]);
      }
    });
  }, []);

  const noteSelect = (note) => {
    setSelectedNote(note);
    setNoteViewerMode(NoteViewerMode.View);
  };

  const noteAdd = (newNote) => {
    noteCreate(newNote).then(id => {
      newNote.id = id;
      setNotes(notes => [...notes, newNote]);
      noteSelect(newNote);
    });
  };

  const noteSave = (changedNote) => {
    noteUpdate(changedNote).then(() => {
      setNotes(notes => notes.map(note => 
        note.id === changedNote.id?
        {...changedNote}
        :
        {...note}
        ));
    });
  };

  const noteDelete = (id) => {
    noteRemove(id).then(() => {
      setNotes(n => {
        const newNotes = n.filter(note => note.id !== id);
        const newNotesCount = newNotes.length;
        if (newNotesCount > 0) {
          noteSelect(newNotes[newNotesCount-1]);
        }
        else {
          setNoteViewerMode(NoteViewerMode.Empty)
        }
        return newNotes;
      });
    });
  };

  return (
      <Grid templateColumns='repeat(6, 1fr)' bg='gray.100' h='100vh'>
        <GridItem as='aside' colSpan='1' bg='green.200' p='10px'>
          <NotesList notes={notes} noteSelect={noteSelect} setNoteViewerModeAdd={()=>setNoteViewerMode(NoteViewerMode.Add)} />
        </GridItem>
        <GridItem as='main' colSpan='5' p='10px'>
          {notes.length > 0 || noteViewerMode !== NoteViewerMode.Empty ?
            <NoteViewer mode={noteViewerMode} note={selectedNote} noteSave={noteSave} noteDelete={noteDelete} noteAdd={noteAdd} />
            :
            <Heading as='h1'>Заметки отсутсвуют</Heading>
          }
        </GridItem>

      </Grid >
  );
}

export default App;
