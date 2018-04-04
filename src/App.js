import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu.js';
import Home from './pages/Home.js';
import Experiments from './pages/Experiments.js';
import About from './pages/About.js';

import Contact from './pages/Contact.js';
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
      
            </main>
            <Footer />
          </div>
        </Router>
      );
    }
    
}