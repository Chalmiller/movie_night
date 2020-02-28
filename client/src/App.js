import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Particles from 'react-particles-js';

import Navbar from './components/navbar.component.js';
import MovieList from './components/movie-list.component.js';
import EditMovie from './components/edit-movie.component.js';
import CreateMovie from './components/create-movie.component.js';
import CreateUser from './components/create-user.component.js';
import MovieNight from './components/movie-night.component.js';
import CreateComment from './components/create-comment.component.js';
import Logo from './components/logo.component';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  return (
    <div className="background">
      <Router>
        <div className="container">
          <Particles className='particles' params={{
                    "particles": {
                        "line_linked": {
                                    "color":"#FFFFFF"
                                    },
                        "number": {
                            "value": 150
                        },
                        "size": {
                            "value": 5
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                }}
                style={{
                        width: '100%',
                        background: `#39191c` 
                 }} />
          <Logo />
          <Navbar />
          <br />
          <Route path='/' exact component={MovieNight} />
          <Route path='/movies' exact component={MovieList} />
          <Route path='/edit_movie/:id' exact component={EditMovie} />
          {/* <Route path='/edit_comment/:id' exact component={EditComment} /> */}
          <Route path='/comments' exact component={CreateComment} />
          <Route path='/create' exact component={CreateMovie} />
          <Route path='/user' exact component={CreateUser} />
        </div>
      </Router>
    </div>
  );
}

export default App;