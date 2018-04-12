import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import GlitterCode from '../../animations/gameCode/smallExperiments/glitter.js';

export default class Glitter extends React.Component {

	componentDidMount () {
		this.code = new GlitterCode(Utils, PIXI);
		this.code.Init();
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
		this.code.Stop();
	}
	render () {
		return (
			 <div id="tugtugCanvas" className="games"></div>
		)
	}
}