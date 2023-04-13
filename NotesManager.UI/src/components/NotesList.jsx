import { useSelector, useDispatch } from 'react-redux';
import { VStack, Flex, Heading, Spacer, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';
import NotesListItem from './NotesListItem';
import { NoteViewerMode } from './NoteViewer';
import { setViewerMode } from '../store/notesSlice';

const NotesList = () => {
    const notes = useSelector(state => state.notes.list);
    const dispatch = useDispatch();

    return (
        <VStack align='stretch'>
            <Flex alignItems='center' py='10px'>
                <Heading as='h1'>Заметки</Heading>
                <Spacer/>
                <IconButton onClick={() => dispatch(setViewerMode({mode: NoteViewerMode.Add}))} colorScheme='green' icon={<AddIcon />} />
            </Flex>
            {notes && notes.length > 0 && notes.map(note => (
                <NotesListItem key={note.id} note={note} />
            ))}
        </VStack>
    );
};
export default NotesList;