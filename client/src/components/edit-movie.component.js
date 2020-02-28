import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class EditMovie extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            genre: '',
            poster: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        // Local Dev
        axios.get("http://localhost:5000/movies/" + this.props.match.params.id)
        // axios.get("/movies/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    title: res.data.title,
                    description: res.data.description,
                    genre: res.data.genre,
                    date: new Date(res.data.date)
                })
            })
            .catch(err => console.log(err));
        // Local Dev
        axios.get("http://localhost:5000/users/")
        // axios.get("/users/")
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

        const movie = {
            username: this.state.username,
            description: this.state.description,
            genre: this.state.genre,
            date: this.state.date
        }

        console.log(movie);
        // Local Dev
        axios.post('http://localhost:5000/movies/update/' + this.props.match.params.id, movie)
        // axios.post('/movies/update/' + this.props.match.params.id, movie)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Movie Suggestion</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
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
                        <label>Description: </label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.description}
                        onChange={this.onChangeDescription} />
                    </div>
                    <div className='form-group'>
                        <label>Genre: </label>
                        <input type='text'
                        required
                        className='form-control'
                        value={this.state.duration}
                        onChange={this.onChangeGenre} />
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Edit Exercise Log' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
}
