import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu.js';
import Home from './pages/Home.js';
import Alternate from './pages/Alternate.js';
require('../node_modules/normalize.css/normalize.css');
export default function App () {
    return (
      <Router>
        <div className="App">
          <header>
            <Menu />
          </header>
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/Alternate" component={Alternate} />
          </main>
        </div>
      </Router>
    );
}