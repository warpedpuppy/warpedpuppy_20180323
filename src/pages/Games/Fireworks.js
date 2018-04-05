import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './WhirlyGigs.css';
import './Games.css';
import { TimelineLite} from 'gsap';
import fireworks from '../../animations/gameCode/smallExperiments/fireworks.js';
export default class FallingNumbers extends React.Component {

	componentDidMount () {
		 
		this.code = new fireworks(PIXI, Utils, TimelineLite);
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
		    </div>
		)
	}
}