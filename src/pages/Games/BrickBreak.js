import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import BrickBreakCode from '../../animations/gameCode/smallExperiments/brickBreak.js';
export default class BrickBreak extends React.Component {

	componentDidMount () {
		 
		this.code = new BrickBreakCode(PIXI, Utils);
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
			<div id="tugtugCanvas" className="games"></div>
		)
	}
}