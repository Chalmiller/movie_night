import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MovieCommentList from './movie-comment-list.component';
import axios from 'axios';
import Collapsible from 'react-collapsible';

export default class CreateMovieComment extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            title: '',
            description: '',
            genre: '',
            poster: '',
            comment: [],
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
                    poster: res.data.poster,
                    comment: res.data.comment,
                    date: new Date(res.data.date)
                })
            })
            .catch(err => console.log(err));

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

    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        console.log("Here is the current state" + this.state)

        let movie_comment = {
            title: this.state.comment.title,
            comments: this.state.comment.comments

        }
        
        axios.post('http://localhost:5000/movies/update/comment/' + this.props.match.params.id, movie_comment)
        // axios.post('/movies/update/' + this.props.match.params.id, movie)
            .then(res => console.log(res.data));

        window.location = '/movies/' + this.props.match.params.id;
    }

    render() {
        const dropdownStyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "20px",
            fontFamily: "Arial"
          };
        return (
            <div>
                <div className="navbar-dark bg-dark" style={dropdownStyle} >
                    <Collapsible className="navbar-brand" trigger="Comment -- (Click to unfold)">
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
                                <label style={{ color: "white" }}>Comment: </label>
                                <input type='text'
                                required
                                className='form-control'
                                value={this.state.comment}
                                onChange={this.onChangeComment} />
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
                                <input type='submit' value='Comment on Movie' className='btn btn-primary' />
                            </div>
                        </form>
                    </Collapsible>
                </div>
                <hr />
                <MovieCommentList props={this.props.match.params.id} />
            </div>
        )
    }
}