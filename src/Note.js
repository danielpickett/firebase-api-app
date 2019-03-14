import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Note extends Component {

  state = {
    editContent: this.props.noteContent
  }
  
  onChange = (e) => {
    this.setState({
      editContent: e.target.value
    })
  }

  onSaveNote = (e) => {
    e.preventDefault();
    console.log('save: ', this.state.editContent);
    this.props.saveNote(this.props.id, this.state.editContent)
    this.props.history.push('/')
  }

  onDeleteNote = () => {
    this.props.deleteNote(this.props.id);
    this.props.history.push('/')
  }



  render() {
    return (
      <>
        <Route exact path="/" render={ () => 
          <>
            <div id={this.props.id} className="note">
              <p>{this.props.id}</p>
              <p>{this.props.noteContent}</p>
              <Link to={`${this.props.id}/edit`}>edit</Link><> / </>
              <Link to={`${this.props.id}/delete`}>delete</Link>
            </div>
          </>
        } />
        <Route path="/:id/edit" render={ ({...props}) => {
          
          return (
            <div className={`note ${props.match.params.id === this.props.id ? "editing" : "disabled"}`}>
              <form onSubmit={this.onSaveNote}>
                <p>{this.props.id}</p>
                
                {props.match.params.id === this.props.id
                ? 
                <>
                  <input type="text" value={this.state.editContent} onChange={this.onChange} />
                  <span>editing: </span>
                  
                  <input type="submit" value="save" />
                  <Link role="button" to="/">cancel</Link>
                </>
                : 
                <p>{this.props.noteContent}</p>
                }
              </form>
            </div>
          )

        }

        } />
        <Route path="/:id/delete" render={ ({...props}) => 
          <div className={`note ${props.match.params.id === this.props.id ? "deleting" : "disabled"}`}>
            <p>{this.props.id}</p>
            <p>{this.props.noteContent}</p>
            {props.match.params.id === this.props.id
            ? 
            <>
              <span>delete? </span>
              <button onClick={this.onDeleteNote}>yes</button><span><> / </></span><Link to="/">no</Link>
            </>
            : 
            ""
            }
          </div>
        } />
      </>
    )
  }
}

export default withRouter(Note);