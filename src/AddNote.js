import React, {Component} from 'react';

class AddNote extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addNote(e.target.elements.note.value);
    e.target.reset();
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