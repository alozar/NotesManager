import { VStack, Flex, Heading, Editable, EditablePreview, EditableInput, Spacer, Textarea, Button, ButtonGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createNoteAsync, deleteNoteAsync, updateNoteAsync } from "../store/notesSlice";

export const NoteViewerMode = { View: 'View', Add: 'Add', Empty: 'Empty'};

const NoteViewer = () => {
  const [head, setHead] = useState('');
  const [content, setContent] = useState('');
  const { selected, viewerMode } = useSelector(state => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    if(viewerMode === NoteViewerMode.Add) {
      setHead('Новая заметка');
      setContent('');
    }
    if(viewerMode === NoteViewerMode.View) {
      setHead(selected.head);
      setContent(selected.content);
    }
  }, [selected, viewerMode]);

  const add = () => {
    const newNote = {
      head: head,
      content: content,
      date: new Date().toJSON(),
    };
    dispatch(createNoteAsync(newNote));
  };

  const save = () => {
    const changedNote = {
      id: selected.id,
      head: head,
      content: content,
      date: new Date().toJSON(),
    };
    dispatch(updateNoteAsync(changedNote));
  };

  const remove = () => {
    dispatch(deleteNoteAsync({id: selected.id}));
  };

  if (viewerMode === NoteViewerMode.Empty) {
    return (<Heading as='h1'>Заметки отсутсвуют</Heading>)
  };
  
  return (
    <VStack align='stretch'>
      <Flex alignItems='center' py='10px'>
        <Heading as='h1'>
          <Editable value={head} onChange={(text) => setHead(text)}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Heading>
        <Spacer/>
        {viewerMode === NoteViewerMode.View ?
          <ButtonGroup spacing='10px' colorScheme='green'>
            <Button onClick={save}>Сохранить</Button>
            <Button onClick={remove}>Удалить</Button>
          </ButtonGroup>
          :
          <Button onClick={add} colorScheme='green'>Создать</Button>
        }
      </Flex>
      <Textarea value={content} onChange={(e) => setContent(e.target.value)}/>
    </VStack>
  );
}

export default NoteViewer;