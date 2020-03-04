import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieComment = props => (
    <div key={props._id}>
        <hr />
        <h3 style={{ color: "white" }}>{props.comment.title}</h3>
        <hr />
        <p style={{ color: "white" }} >{props.comment.comments}</p>
        <Link to={"/edit_movie_comment/"+props.comment._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteMovieComment(props.movie._id) }}>delete</a>
    </div>
)

export default class MovieCommentList extends Component {
  constructor(props) {
    super(props);
    this.deleteMovieComment = this.deleteMovieComment.bind(this)

    this.state = {
        id: props.props,
        comments: []
    };
  }

  componentDidMount() {
    console.log(this.state.id)
    // Local Dev
    // axios.get('http://localhost:5000/movies/' + this.state.id)
    axios.get('/movies/' + this.state.id)
      .then(response => this.setState({ comments: response.data.comment }))
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMovieComment(id) {
    // Local Dev
    // axios.delete('http://localhost:5000/movies/' + id)
    axios.delete('/movies/' + id)
      .then(response => {console.log(response.data)});

    this.setState({
      comments: this.state.comments.filter(el => el._id !== id)
    })
  }

  movieCommentsList() {
    return this.state.comments.map(currMovieComment => {
        return <MovieComment comment={currMovieComment} deleteComment={this.deleteMovieComment} key={currMovieComment._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3 style={{ color: "white", textAlign: "center" }} >Movie Comments</h3>
        { this.movieCommentsList() }
      </div>
    )
  }
}