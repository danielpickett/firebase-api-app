import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

class Note extends Component {

  // Maintain a local state of editContent to hold the content of any note currently being edited.
  state = {
    editContent: this.props.noteContent
  }
  
  // Keep editContent synchronized with the content of the form input for any note currently being edited.
  onChange = (e) => {
    this.setState({
      editContent: e.target.value
    })
  }

  // Save edited note by calling saveNote() with the id and editContent of the current note and then change the Route back to home
  onSaveNote = (e) => {
    e.preventDefault();
    this.props.saveNote(this.props.id, this.state.editContent)
    this.props.history.push('/')
  }

  // Delete note by calling deleteNote() with the id of the current note and then change the Route back to home
  onDeleteNote = () => {
    this.props.deleteNote(this.props.id);
    this.props.history.push('/')
  }


  // Wait a bit, then add an 'animate' class to the container div of the current note.
  // I know this is a bit hacky, but this is the only way I could figure out to get CSS animations working between Routes,
  // without adding complexity through additional dependencies.
  animate = () => {
    const id = this.props.id;
    setTimeout(function(){
      // future improvement: add try catch
      document.querySelector("#" + id + ".note").classList.add('animate');
    }, 0);
  }


  render() {
    this.animate();
    return (
      <>
        {/* The Home Route */}
        <Route exact path="/" render={ () => 
          <>
            <div id={this.props.id} className="note">
              <div className="container">
                <div className="content">{this.props.noteContent}</div>
                <div className="button-group">
                  <Link to={`${this.props.id}/edit`}>edit</Link>
                  <Link to={`${this.props.id}/delete`}>delete</Link>
                </div>
              </div>
            </div>
          </>
        } />
        {/* The Edit Route for this specific Note */}
        <Route path="/:id/edit" render={ ({...props}) => {
          return (
            <div id={this.props.id} className={`note ${props.match.params.id === this.props.id ? "editing" : "disabled"}`}>
              <div className="container">
                {props.match.params.id === this.props.id // Is this note the one being edited, as identified in the path?
                ? // If so, generate a form and corresponding inputs
                <>
                  <form className="content-form" onSubmit={this.onSaveNote}>
                    <input className="content" type="text" value={this.state.editContent} onChange={this.onChange} />
                    <div className="button-group">
                      <span className="micro-copy">editing:</span>
                      <input type="submit" value="save" />
                      <Link to="/">cancel</Link>
                    </div>                    
                  </form>
                </>
                : // If not, just show the content, and don't add any buttons to the button-group
                <>
                  <div className="content">{this.props.noteContent}</div>
                  <div className="button-group"></div>
                </>
                }
              </div>
            </div>
          )
        }

        } />
        {/* The Delete Route for this specific Note */}
        <Route path="/:id/delete" render={ ({...props}) => 
          <div id={this.props.id} className={`note ${props.match.params.id === this.props.id ? "deleting" : "disabled"}`}>
            <div className="container">
              <div className="content">{this.props.noteContent}</div> {/* Show the normal note content for all notes when the Route is '/delete'  */}
              {props.match.params.id === this.props.id // Is this note the one being deleted, as identified in the path?
              ? // If so, fill the button-group buttons for a delete confirmation
              <div className="button-group">
                <span className="micro-copy">delete?</span>
                <button onClick={this.onDeleteNote}>yes</button>
                <Link to="/">no</Link>
              </div>
              : // If not, just show an empty button group
              <div className="button-group"></div>
              }
            </div>
          </div>
        } />
      </>
    )
  }
}

export default withRouter(Note); // Using withRouter() here allowed me to use this.props.history.push('/') in onDeleteNote() and onSaveNote() above