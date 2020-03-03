import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movie = props => (
  <tr>
    <td><img src={ props.movie.poster }  alt="movie_poster" className="card card-body mb-3" width="200px" height="200px"/></td>
    <td style={{ color: "white" }} >{props.movie.username}</td>
    <td style={{ color: "white" }}>
      {props.movie.description}
      <hr />
      <div className='form-group'>
        <Link to={"/movies/"+props.movie._id} className='btn btn-primary'>Comments Section</Link>
      </div>
    </td>
    <td style={{ color: "white" }}>{props.movie.genre}</td>
    <td style={{ color: "white" }}>{props.movie.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit_movie/"+props.movie._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMovie(props.movie._id) }}>delete</a>
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
    // Local Dev
    axios.get('http://localhost:5000/movies/')
    // axios.get('/movies/')
      .then(response => {
        this.setState({ movies: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMovie(id) {
    // Local Dev
    axios.delete('http://localhost:5000/movies/' + id)
    // axios.delete('/movies/' + id)
      .then(response => { console.log(response.data)});

    this.setState({
      movies: this.state.movies.filter(el => el._id !== id)
    })
  }

  moviesList() {
    return this.state.movies.map(currMovie => {
      return <Movie movie={currMovie} deleteMovie={this.deleteMovie} key={currMovie._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3 style={{ color: "white", textAlign: "center" }} >Suggested Movies</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Movie Poster</th>
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