import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import { TweenMax } from 'gsap';
import LadybugCode from '../../animations/gameCode/smallExperiments/ladybug.js';
import Loader from '../../components/Loader';

export default class Ladybug extends React.Component {

	componentDidMount () {	 
		this.code = new LadybugCode(PIXI, Utils, TweenMax);
		this.code.init();
	}
	addMore (e) {
		e.preventDefault();
		this.code.addMore();
	}
	reset (e) {
		e.preventDefault();
		this.code.reset();
	}
	componentWillUnmount () {
		this.code.stop();
	}
	render () {
		return (
			<div id="tugtugCanvas" className="games"><Loader /></div>
		)
	}
}