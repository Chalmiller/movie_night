import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Comment = props => (
    <div>
        <hr />
        <h3 style={{ color: "white" }}>{props.comment.title}</h3>
        <hr />
        <p style={{ color: "white" }} >{props.comment.comment}</p>
        <p style={{ color: "white" }}>{props.comment.date.substring(0,10)}</p>
        <Link to={"/edit_comment/"+props.comment._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteComment(props.movie._id) }}>delete</a>
    </div>
)

export default class CommentList extends Component {
  constructor(props) {
    super(props);

    this.deleteComment = this.deleteComment.bind(this)

    this.state = {comments: []};
  }

  componentDidMount() {
    // Local Dev
    // axios.get('http://localhost:5000/comments/')
    axios.get('/comments/')
      .then(response => {
          console.log(response.data)
        this.setState({ comments: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteComment(id) {
    // Local Dev
    // axios.delete('http://localhost:5000/comments/' + id)
    axios.delete('/comments/' + id)
      .then(response => { console.log(response.data)});

    this.setState({
      comments: this.state.comments.filter(el => el._id !== id)
    })
  }

  commentsList() {
    return this.state.comments.map(currComment => {
      return <Comment comment={currComment} deleteComment={this.deleteComment} key={currComment._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3 style={{ color: "white", textAlign: "center" }} >Movie Comments</h3>
        { this.commentsList() }
      </div>
    )
  }
}