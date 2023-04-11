const API = 'https://localhost:7222/';
const NOTES = 'notes/';
const HEADERS = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
});

export const notesGet = () => fetch(API + NOTES, {method: 'GET'})
  .then(response => response.json())
  .catch(error => {console.log(error); throw error;});

export const noteGet = (id) => fetch(API + NOTES + id, {method: 'GET'})
  .then(response => response.json())
  .catch(error => {console.log(error); throw error;});

export const noteCreate = (note) => fetch(API + NOTES, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(note)
  })
  .then(response => response.json())
  .catch(error => {console.log(error); throw error;});

export const noteUpdate = (note) => fetch(API + NOTES, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(note)
  })
  .catch(error => {console.log(error); throw error;});

export const noteRemove = (id) => fetch(API + NOTES + id, {method: 'DELETE'})
  .catch(error => {console.log(error); throw error;});