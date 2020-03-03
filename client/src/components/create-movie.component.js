import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import gql from 'graphql-tag';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const SEARCH_QUERY = gql`
  query SEARCH_QUERY($movie: String!) {
    movieInfo(movie: $movie) {
      Title
      Year
      Rated
      Released
      Director
      Actors
      Plot
      Poster
      Ratings {
          Source
          Value
      }
    }
  }
`;

export default class CreateMovie extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            title: '',
            description: '',
            genre: '',
            poster: '',
            comment: [{
                title: '',
                comments: ''
            }],
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        // Local Dev
        axios.get("http://localhost:5000/users")
        // axios.get("/users")
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
            }
        )
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeGenre(e) {
        this.setState({
            genre: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        let movie = {
            username: this.state.username,
            title: this.state.title,
            description: this.state.description,
            genre: this.state.genre,
            poster: this.state.poster,
            comment: this.state.comment,
            date: this.state.date
        }
        
        const apiString = this.state.title.replace(/ /g,"+");
        const uri = "https://www.omdbapi.com/?apikey=5c5dfb&t=" + apiString
        
        axios.get(uri)
            .then(response => {
                movie.description = response.data.Plot
                movie.genre = response.data.Genre
                movie.poster = response.data.Poster
                // Local Dev
                return axios.post('http://localhost:5000/movies/add', movie)
                // return axios.post('/movies/add', movie)
            }).then(response => console.log(response.data))
        

        // window.location = '/';
    }

    render() {
        // let { movie } = this.props.match.params;
        return (
            <div>
                <h3 style={{ color: "white" }}>Create New Movie Suggestion</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label style={{ color: "white" }}>Username: </label>
                        <select ref='userInput'
                                required 
                                className='form-control'
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) {
                                return <option 
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }
                        </select> 
                    </div>
                    <div className='form-group'>
                        <label style={{ color: "white" }}>Title: </label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.title}
                        onChange={this.onChangeTitle} />
                    </div>
                    <div className='form-group'>
                        <label style={{ color: "white" }}>Date: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Create Movie Request' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
}