import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg" style={{ padding: "20px", }}>
                    <Link to='/' className="navbar-brand" >Movie Night!</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to='/movies' className="nav-link">Movies</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to='/create' className="nav-link">Suggest Movie</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to='/user' className="nav-link">Create User</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}