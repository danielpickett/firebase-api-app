import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Note extends Component {

  state = {
    editContent: this.props.noteContent,
    noteState: "normal"
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

  componentDidMount = () => {
    const id = this.props.id;
    setTimeout(function(){
      console.log(document.getElementById(id));
      document.getElementById(id).classList.add('fizz');
    }, 2000);
  }





  render() {
    return (
      <>
        <Route exact path="/" render={ () => 
          <>
              <div className="container">
                <div className="content">{this.props.noteContent}</div>
                <div className="button-group">
                  <Link to={`${this.props.id}/edit`}>edit</Link>
                  <Link to={`${this.props.id}/delete`}>delete</Link>
                </div>
              </div>
          </>
        } />
        <Route path="/:id/edit" render={ ({...props}) => {
          return (
            <div className={`container ${props.match.params.id === this.props.id ? "editing" : "disabled"}`}>
              {props.match.params.id === this.props.id
              ? 
              <>
                <form className="content-form" onSubmit={this.onSaveNote}>
                  <input className="content" type="text" value={this.state.editContent} onChange={this.onChange} />
                  {/* <textarea onFocus={() => {this.style.height = this.scrollHeight + "px"}} className="content" value={this.state.editContent} onChange={this.onChange} ></textarea> */}
                  <div className="button-group">
                    <span className="micro-copy">editing:</span>
                    <input type="submit" value="save" />
                    <Link to="/">cancel</Link>
                  </div>                    
                </form>

              </>
              : 
              <>
                <div className="content">{this.props.noteContent}</div>
                <div className="button-group"></div>
              </>
              }
            </div>
          )
        }

        } />
        <Route path="/:id/delete" render={ ({...props}) => 
          <div className={`container ${props.match.params.id === this.props.id ? "deleting" : "disabled"}`}>
            <div className="content">{this.props.noteContent}</div>
            {props.match.params.id === this.props.id
            ? 
            <div className="button-group">
              <span className="micro-copy">delete?</span>
              <button onClick={this.onDeleteNote}>yes</button>
              <Link to="/">no</Link>
            </div>
            : 
            <div className="button-group"></div>
            }
          </div>
        } />
      </>
    )
  }
}

export default withRouter(Note);