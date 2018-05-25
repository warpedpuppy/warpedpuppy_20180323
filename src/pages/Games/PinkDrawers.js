import React from 'react';
import './Games.css';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/gameCode/bouncePig/utils.js';
import { TimelineMax } from 'gsap';
import PinkDrawersCode from '../../animations/gameCode/smallExperiments/drawers.js';


export default class PinkDrawers extends React.Component {
	componentDidMount(){
		this.game = new PinkDrawersCode( 
			Utils,
			PIXI,
			TimelineMax);
		this.game.Init();
	}
	componentWillUnmount () {
		this.game.stop();
	}
	render () {
		return (
			<div id="tugtugCanvas" className="games">
				<div id="fpsChecker"></div>
			</div>
	    );
	}
    
}
