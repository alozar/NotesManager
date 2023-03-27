import {
    Box
} from '@chakra-ui/react'

const NotesListItem = ({ note, noteSelect }) => {
    return (
        <Box border='1px solid black' cursor='pointer' onClick={() => noteSelect(note)}>
            {note.head}
        </Box>
    );
};
export default NotesListItem;