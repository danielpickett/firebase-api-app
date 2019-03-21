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
    
    fetch('https://my-firebase-api-app.firebaseio.com/notes.json')
    .then(res => res.json())
    .then(notes => {
      if (notes) {
        const notesArr = Object.entries(notes).map(([id, attrs]) => ({
          id,
          attrs
        })).sort(function(a, b){
          return parseInt(b.attrs.timeStamp) - parseInt(a.attrs.timeStamp);
        });
        this.setState({ notes: notesArr })
      }

    });
  }

  handleAddNote = (newContent) => {
    const timeStamp = Date.now();
    const newNote = {
      timeStamp: timeStamp,
      content: newContent
    }
    fetch('https://my-firebase-api-app.firebaseio.com/notes.json', {
      method: "POST",
      body: JSON.stringify(newNote)
    })
    .then(res => res.json())
    .then(noteName => {
      this.setState((prevState) => {
        return {
          notes: [
            
            {
              id: noteName.name,
              attrs: {
                timeStamp: timeStamp, 
                content: newContent
              }
            },
            ...prevState.notes,
          ]
        }
      });
    });
  }

  handleSaveNote = (id, noteContent) => {
    // console.log('save', id, noteContent);
    fetch("https://my-firebase-api-app.firebaseio.com/notes/" + id + "/.json", {
      body: "{\"content\": \"" + noteContent + "\"}",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "PATCH"    
    })
    .then(res => res.json())
    .then((res) => {
      // console.log('res', res);
      this.setState(prevState => ({notes: prevState.notes.map((note) => ({
        id: note.id,
        attrs: {
          timeStamp: note.attrs.timeStamp,
          content: note.id === id ? noteContent : note.attrs.content

        }
        // (note.id === id ? res[id]: note.noteContent)
      }))})
      );
    });
  }

  handleDeleteNote = (id) => {
    fetch('https://my-firebase-api-app.firebaseio.com/notes/' + id + '.json', {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      this.setState(prevState => {
        const newNotes = prevState.notes.filter(note => (
          note.id !== id
        ));
        return { notes: newNotes }
      });
    });
  }

  render() {
    // console.log('here > ', this.state.notes);
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
