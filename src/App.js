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
        const notesArr = Object.entries(notes).map(([id, noteContent]) => ({
          id,
          noteContent
        }));
        this.setState({ notes: notesArr })
      }

    });
  }

  handleAddNote = (newNote) => {
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
              noteContent: newNote
            },
            ...prevState.notes,
          ]
        }
      });
    });
  }

  handleSaveNote = (id, noteContent) => {
    console.log('save', id, noteContent);
    fetch("https://my-firebase-api-app.firebaseio.com/notes.json", {
      body: "{\"" + id + "\":\"" + noteContent + "\"}",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "PATCH"
    })
    .then(res => res.json())
    .then((res) => {
      this.setState(prevState => ({notes: prevState.notes.map((note) => ({
        id: note.id,
        noteContent: (note.id === id ? res[id]: note.noteContent)
      }))})
      );
      // <Route render={() => { history.push('/' + this.props.id + '/edit') }} />
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
    console.log(this.state.notes);
    return (
      <BrowserRouter>
      <div className="app">
        <AddNote addNote={this.handleAddNote}/>
        {this.state.notes.map( note => (
          <div id={note.id} key={note.id} className="note">
            <Note 
              noteContent={note.noteContent}
              key={note.id}
              id={note.id}
              saveNote={this.handleSaveNote}
              deleteNote={this.handleDeleteNote}
            />
          </div>
        ))}

      </div>
      </BrowserRouter>
    );
  }
}

export default App;
