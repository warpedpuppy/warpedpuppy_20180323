import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import Stats from '../../animations/Stats.js';
import './WhirlyGigs.css';
import './Games.css';
import Loader from '../../components/Loader';

import fallingGreenNumbers from '../../animations/gameCode/smallExperiments/fallingNumbers.js';

export default class FallingNumbers extends React.Component {
	constructor (props) {
		super(props);
	}
	componentDidMount () {
		this.code = new fallingGreenNumbers(PIXI, Utils, Stats, this.props.loader_data);
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
			<div id="tugtugCanvas" className="games">
			<Loader visible={this.props.loader_data('return')} />
	        <div className="uiElementCont">
	        	<div id='my-stats-container'></div>
	        </div>
		    </div>
		)
	}
}