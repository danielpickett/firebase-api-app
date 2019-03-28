import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './style.css';

import Note from './Note';
import AddNote from './AddNote';

class App extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    // Retrieve existing notes
    fetch('https://my-firebase-api-app.firebaseio.com/notes.json')
    .then(res => res.json())
    .then(notes => {
      if (notes) {
        // Firebase does not return an array, it returns an object filled with objects
        const notesArr = Object.entries(notes).map(([id, attrs]) => ({ // Use Object.entries to convert to an array
          id,
          attrs
        })).sort(function(a, b){  // Sort the notes by their timeStamp (the time it was created) in reverse to put newest notes on top
          return parseInt(b.attrs.timeStamp) - parseInt(a.attrs.timeStamp);
        });
        this.setState({ notes: notesArr })  // Set state to this new sorted array
      }
    });
  }


  // Add a new note
  handleAddNote = (newContent) => {
    const timeStamp = Date.now();  // Time stamp of when this note was created
    const newNote = {
      timeStamp: timeStamp,
      content: newContent
    }
    fetch('https://my-firebase-api-app.firebaseio.com/notes.json', {  // POST to Firebase
      method: "POST",
      body: JSON.stringify(newNote)
    })
    .then(res => res.json())
    .then(noteName => {
      this.setState((prevState) => { // Add new note to state
        return {
          notes: [ // The new note
            {
              id: noteName.name,
              attrs: {
                timeStamp: timeStamp, 
                content: newContent
              }
            },
            ...prevState.notes, // Older notes go on the bottom
          ]
        }
      });
    });
  }

  // Save an edited note
  handleSaveNote = (id, noteContent) => {
    // update note in Firebase using PATCH
    fetch("https://my-firebase-api-app.firebaseio.com/notes/" + id + "/.json", {
      body: "{\"content\": \"" + noteContent + "\"}",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "PATCH"
    })
    .then(res => res.json())
    .then(() => {
      this.setState(prevState => ({notes: prevState.notes.map((note) => ({
        id: note.id,
        attrs: {
          timeStamp: note.attrs.timeStamp,
          content: note.id === id ? noteContent : note.attrs.content  // Ternary operator: if the note id of the current map object matches the id of the note that was edited, use the new content.
        }
      }))})
      );
    });
  }

  // Delete a note
  handleDeleteNote = (id) => {
    // Delete note frm o
    fetch('https://my-firebase-api-app.firebaseio.com/notes/' + id + '.json', {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      this.setState(prevState => {
        const newNotes = prevState.notes.filter(note => (
          note.id !== id  // Return only notes that don't match the id of the note to be deleted
        ));
        return { notes: newNotes }
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
      <div className="app">
        <AddNote addNote={this.handleAddNote}/>
        {this.state.notes.map( note => (
          <Note
            noteContent={note.attrs.content}
            key={note.id}
            id={note.id}
            saveNote={this.handleSaveNote}
            deleteNote={this.handleDeleteNote}
          />
        ))}
      </div>
      </BrowserRouter>
    );
  }
}

export default App;