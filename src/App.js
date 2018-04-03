import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu.js';
import Home from './pages/Home.js';
import Experiments from './pages/Experiments.js';
import About from './pages/About.js';
import BouncePig from './pages/Games/BouncePig.js';
import WhirlyGigs from './pages/Games/WhirlyGigs.js';
import FallingNumbers from './pages/Games/FallingNumbers.js';
import Fireworks from './pages/Games/Fireworks.js';
import PrettyDots from './pages/Games/PrettyDots.js';
import SoundSync from './pages/Games/SoundSync.js';

import Glitter from './pages/Games/Glitter.js';
import Contact from './pages/Contact.js';
import GamePage from './pages/GamePage.js';
import Footer from './components/Footer.js';
import Utils from './animations/utils.js';


require('../node_modules/normalize.css/normalize.css');
export default class App extends React.Component {

    componentDidMount () {
      // let utils = new Utils();
      // let url_vars = utils.createParamObject();
      // if(!url_vars.cc) {
      //   window.location = '/?cc=1234';
      // }
    }
    render () {
      return (
        <Router>
          <div className="App">
            <header>
              <Menu />
            </header>
            <main>
              <Route exact path="/" component={Home} />
              <Route exact path="/Experiments" component={Experiments} />
              <Route exact path="/About" component={About} />
              <Route exact path="/Contact" component={Contact} />
              <Route exact path="/GamePage" component={GamePage} />
              <Route exact path="/BouncePig" component={BouncePig} />
              <Route exact path="/WhirlyGigs" component={WhirlyGigs} />
              <Route exact path="/FallingNumbers" component={FallingNumbers} />
              <Route exact path="/Fireworks" component={Fireworks} />
              <Route exact path="/PrettyDots" component={PrettyDots} />
              <Route exact path="/Glitter" component={Glitter} />
              <Route exact path="/SoundSync" component={SoundSync} />
            </main>
            <Footer />
          </div>
        </Router>
      );
    }
    
}