import React, {Component} from 'react';

class AddNote extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addNote(e.target.elements.note.value);
    e.target.reset();
  }

  render() {
    return (
      <form className="new-note-form" onSubmit={this.handleSubmit}>
        <input type="text" name="note" required />
        <input type="submit" />
      </form>
    )
  }
}

export default AddNote;