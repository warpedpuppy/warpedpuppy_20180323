import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import ThreeBallsCode from '../../animations/gameCode/smallExperiments/threeBalls.js';

export default class ElasticThree extends React.Component {

	componentDidMount () {
		this.code = new ThreeBallsCode(PIXI,Utils);
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