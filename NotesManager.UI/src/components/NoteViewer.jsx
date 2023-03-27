import { VStack, Flex, Heading, Editable, EditablePreview, EditableInput, Spacer, Textarea, Button, ButtonGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import uniqid from 'uniqid';

export const NoteViewerMode = { View: 'View', Add: 'Add'};

const NoteViewer = ({mode = NoteViewerMode.View, note, noteSave, noteDelete, noteAdd}) => {
  const [head, setHead] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if(mode === NoteViewerMode.Add) {
      setHead('Новая заметка');
      setContent('');
    } else {
      setHead(note.head);
      setContent(note.content);
    }
  }, [note, mode]);

  const add = () => {
    const newNote = {
      id: uniqid(),
      head: head,
      content: content,
      date: new Date(),
    };
    noteAdd(newNote);
  };

  const save = () => {
    const changedNote = {
      ...note,
      head: head,
      content: content,
      date: new Date(),
    };
    noteSave(changedNote);
  };

  const remove = () => {
    noteDelete(note.id);
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
        {mode === NoteViewerMode.View ?
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