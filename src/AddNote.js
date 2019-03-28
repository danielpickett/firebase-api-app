import React, {Component} from 'react';

class AddNote extends Component {

  // Handle submission of the entire form element, so the browser can handle input value and enter-key-to-submit behavior
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addNote(e.target.elements.note.value); // Form element manages "state" ...
    e.target.reset(); // and manages the form reset
  }

  render() {
    return (
      <div className="new-note-wrapper">
      <form className="new-note-form" onSubmit={this.handleSubmit}>
        <input type="text" name="note" placeholder="Type a new note" required />
        <input type="submit" value="save note"/>
      </form>
      </div>
    )
  }
}

export default AddNote;