import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { noteGet, noteCreate, noteRemove, noteUpdate, notesGet } from "../services/notesApiService";
import { NoteViewerMode } from "../components/NoteViewer";

export const getNoteAsync = createAsyncThunk(
  'notes/getNoteAsync',
  async ({id}, {rejectWithValue}) => {
    try {
      const response = await noteGet(id);
      if (!response.ok) {
        throw new Error('Can\'t get note by id! ServerError!');
      }
      const note = await response.json();
      return note;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNoteAsync = createAsyncThunk(
  'notes/createNoteAsync',
  async (note, {rejectWithValue, dispatch}) => {
    try {
      const response = await noteCreate(note);
      if (!response.ok) {
        throw new Error('Can\'t create note! ServerError!');
      }
      note.id = await response.json();
      
      dispatch(addNote(note));
      dispatch(setSelected(note));
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNoteAsync = createAsyncThunk(
  'notes/deleteNoteAsync',
  async ({id}, {rejectWithValue, dispatch}) => {
    try {
      const response = await noteRemove(id);
      if (!response.ok) {
        throw new Error('Can\'t delete note! ServerError!');
      }
      dispatch(removeNote({id}));
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateNoteAsync = createAsyncThunk(
  'notes/updateNoteAsync',
  async (note, {rejectWithValue, dispatch, getState}) => {
    try {
      const response = await noteUpdate(note);
      if (!response.ok) {
        throw new Error('Can\'t update note! ServerError!');
      }
      dispatch(editNote(note));
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNotesAsync = createAsyncThunk(
  'notes/fetchNotesAsync',
  async (_, {rejectWithValue}) => {
    try {
      const response = await notesGet();
      if (!response.ok) {
        throw new Error('Can\'t get notes! ServerError!');
      }
      const notes = await response.json();
      return notes;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const setSelectedLocal = (state, note) => {
  state.viewerMode = NoteViewerMode.View;
  state.selected = note;
};

const setViewerModeLocal = (state, mode) => {
  state.viewerMode = mode;
};

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    list: [],
    viewerMode: NoteViewerMode.Empty,
    selected: null,
    status: null,
    error: null,
  },
  reducers: {
    addNote(state, action) {
      state.list.push(action.payload);//note
    },
    removeNote(state, action) {
      state.list = state.list.filter(note => note.id !== action.payload.id);//{id}
    },
    editNote(state, action) {
      state.list = state.list.map(note => note.id !== action.payload.id ? note : action.payload);//note
    },
    setViewerMode(state, action) {
      setViewerModeLocal(state, action.payload.mode); //{mode}
    },
    setSelected(state, action) {
      setSelectedLocal(state, action.payload); //note
    }
  },
  extraReducers: {
    [getNoteAsync.rejected]: setError,
    
    [createNoteAsync.rejected]: setError,

    [deleteNoteAsync.fulfilled]: (state) => {
      state.status = 'resolve';
      const listLength = state.list.length;
      if ( listLength > 0) {
        setSelectedLocal(state, state.list[listLength-1]);
      }
      else {
        setViewerModeLocal(state, NoteViewerMode.Empty);
      }
    },
    [deleteNoteAsync.rejected]: setError,

    [updateNoteAsync.rejected]: setError,

    [fetchNotesAsync.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchNotesAsync.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.list = action.payload;
      if (action.payload.length > 0) {
        setSelectedLocal(state, action.payload[0]);
      }
    },
    [fetchNotesAsync.rejected]: setError,
  }
});

export const { addNote, removeNote, editNote, setViewerMode, setSelected } = notesSlice.actions;
export default notesSlice.reducer;