import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  PageHeader,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { invokeApig } from '../libs/awsLib.js';
import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      notes: [],
    };
  }

  async componentWillMount() {
    if (this.props.userToken === null) {
      return;
    }

    this.setState({ isLoading: true });

    try {
      const results = await this.notes();
      this.setState({ notes: results });
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  onNoteClick = (event) => {
    event.preventDefault();
    this.props.router.push(event.currentTarget.getAttribute('href'));
  }

  notes() {
    return invokeApig({ path: '/notes' }, this.props.userToken);
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) => (
      i !== 0
        ? ( <ListGroupItem
              key={note.noteId}
              href={`/notes/${note.noteId}`}
              onClick={this.onNoteClick}
              header={note.content.trim().split('\n')[0]}>
                { "Created: " + (new Date(note.createdAt)).toLocaleString() }
            </ListGroupItem> )
        : ( <ListGroupItem
              key="new"
              href="/notes/new"
              onClick={this.onNoteClick}>
                <h4><b>&#65291;</b> Create a new note</h4>
            </ListGroupItem> )
    ));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          { ! this.state.isLoading
            && this.renderNotesList(this.state.notes) }
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        { this.props.userToken === null
          ? this.renderLander()
          : this.renderNotes() }
      </div>
    );
  }
}

export default withRouter(Home);
