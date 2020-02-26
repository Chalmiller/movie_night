import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movie = props => (
  <tr>
    <td>{props.movie.username}</td>
    <td>{props.movie.description}</td>
    <td>{props.movie.genre}</td>
    <td>{props.movie.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.movie._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMovie(props.movie._id) }}>delete</a>
    </td>
  </tr>
)

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.deleteMovie = this.deleteMovie.bind(this)

    this.state = {movies: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/movies/')
      .then(response => {
        this.setState({ movies: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/movies/' + id)
      .then(response => { console.log(response.data)});

    this.setState({
      movies: this.state.movies.filter(el => el._id !== id)
    })
  }

  moviesList() {
    return this.state.movies.map(currMovie => {
      return <Exercise movie={currMovie} deleteMovie={this.deleteMovie} key={currMovie._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Suggested Movies</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.moviesList() }
          </tbody>
        </table>
      </div>
    )
  }
}