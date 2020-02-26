import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Navbar from './components/navbar.component.js';
import MovieList from './components/movie-list.component.js';
import EditMovie from './components/edit-movie.component.js';
import CreateMovie from './components/create-movie.component.js';
import CreateUser from './components/create-user.component.js';
import MovieNight from './components/movie-night.component.js';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path='/' exact component={MovieNight} />
        <Route path='/movies' exact component={MoviesList} />
        <Route path='/edit/:id' exact component={EditMovie} />
        <Route path='/create' exact component={CreateMovie} />
        <Route path='/user' exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;