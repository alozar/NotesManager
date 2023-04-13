import { Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setSelected  } from "../store/notesSlice";

const NotesListItem = ({ note }) => {
    const dispatch = useDispatch();

    return (
        <Box border='1px solid black' cursor='pointer' onClick={() => dispatch(setSelected(note))}>
            {note.head}
        </Box>
    );
};
export default NotesListItem;