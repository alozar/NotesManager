import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Grid, GridItem } from '@chakra-ui/react'
import NoteViewer from './components/NoteViewer';
import NotesList from './components/NotesList';
import { fetchNotesAsync } from "./store/notesSlice";

const App = () => {
  const { status, error } = useSelector(state => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotesAsync());
  },[]);

  return (
      <Grid templateColumns='repeat(6, 1fr)' bg='gray.100' h='100vh'>
        <GridItem as='aside' colSpan='1' bg='green.200' p='10px'>
          <NotesList />
        </GridItem>
        <GridItem as='main' colSpan='5' p='10px'>
          <NoteViewer />
        </GridItem>
      </Grid >
  );
}

export default App;
