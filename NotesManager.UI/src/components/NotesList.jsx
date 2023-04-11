import { VStack, Flex, Heading, Spacer, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';
import NotesListItem from './NotesListItem';

const NotesList = ({ notes, noteSelect, setNoteViewerModeAdd }) => {
    return (
        <VStack align='stretch'>
            <Flex alignItems='center' py='10px'>
                <Heading as='h1'>Заметки</Heading>
                <Spacer/>
                <IconButton onClick={setNoteViewerModeAdd} colorScheme='green' icon={<AddIcon />} />
            </Flex>
            {notes && notes.length > 0 && notes.map(note => (
                <NotesListItem key={note.id} note={note} noteSelect={noteSelect} />
            ))}
        </VStack>
    );
};
export default NotesList;