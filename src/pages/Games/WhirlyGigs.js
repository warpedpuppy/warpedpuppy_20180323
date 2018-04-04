import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import whirlyGigs from '../../animations/gameCode/smallExperiments/whirlyGigs.js';
import Stats from '../../animations/Stats.js';
import './WhirlyGigs.css';
import './Games.css';

export default class WhirlyGigs extends React.Component {

	componentDidMount () {
		this.code = new whirlyGigs(PIXI, Utils, Stats);
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
		            <div className="uiElement">
		                <button onClick={(e) => this.addMore(e) }>add more</button>
		            </div>
		            <div className="uiElement">
		                <button onClick={(e) => this.reset(e) }>reset</button>
		            </div>
		        </div>
		       
		    </div>
		    </div>
		)
	}
}