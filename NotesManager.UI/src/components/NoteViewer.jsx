import { VStack, Flex, Heading, Editable, EditablePreview, EditableInput, Spacer, Textarea, Button, ButtonGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const NoteViewerMode = { View: 'View', Add: 'Add', Empty: 'Empty'};

const NoteViewer = ({mode = NoteViewerMode.Empty, note, noteSave, noteDelete, noteAdd}) => {
  const [head, setHead] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if(mode === NoteViewerMode.Add) {
      setHead('Новая заметка');
      setContent('');
    }
    if(mode === NoteViewerMode.View) {
      setHead(note.head);
      setContent(note.content);
    }
  }, [note, mode]);

  const add = () => {
    const newNote = {
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

  if (mode === NoteViewerMode.Empty) {
    return (<Heading as='h1'>Выберете заметку</Heading>)
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