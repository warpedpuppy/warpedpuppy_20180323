import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import Stats from '../../animations/Stats.js';
import './WhirlyGigs.css';
import './Games.css';

import fallingGreenNumbers from '../../animations/gameCode/smallExperiments/fallingNumbers.js';
import GamePagination from '../../components/experiments/GamePagination.js';

export default class FallingNumbers extends React.Component {

	componentDidMount () {
		 
		this.code = new fallingGreenNumbers(PIXI, Utils, Stats);
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
			<div>
				<div id="tugtugCanvas" className="games">
		        <div className="uiElementCont">
		        	<div id='my-stats-container'></div>
		        </div>
			    </div>
			    <GamePagination />
		    </div>
		)
	}
}