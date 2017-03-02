import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { invokeApig } from '../libs/awsLib.js';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      note: null,
      content: '',
    };
  }

  async componentWillMount() {
    try {
      const results = await this.getNote();
      this.setState({
        note: results,
        content: results.content,
      });
    }
    catch(e) {
      alert(e);
    }
  }

  getNote() {
    return invokeApig({ path: `/notes/${this.props.params.id}` }, this.props.userToken);
  }

  render() {
    return (
      <div className="Notes">
      </div>
    );
  }
}

export default withRouter(Notes);
