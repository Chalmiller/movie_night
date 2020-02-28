import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CommentList from './comment-list.component';
import axios from 'axios';
import Collapsible from 'react-collapsible';

export default class CreateComment extends Component {
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
            comment: '',
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

        let comment = {
            username: this.state.username,
            title: this.state.title,
            comment: this.state.comment,
            date: this.state.date
        }
        
        axios.post('http://localhost:5000/comments/add/', comment)
        // axios.post('/comments/add/' + this.props.match.params.id, comment)
            .then(res => console.log(res.data));

        window.location = '/comments';
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
                    <Collapsible className="navbar-brand" trigger="Comment">
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
                <CommentList />
            </div>
        )
    }
}