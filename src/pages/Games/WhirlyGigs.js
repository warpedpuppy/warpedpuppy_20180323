import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import whirlyGigs from '../../animations/gameCode/whirlyGigs/whirlyGigs.js';
import Stats from '../../animations/Stats.js';
import './WhirlyGigs.css';
import './Games.css';

export default class WhirlyGigs extends React.Component {

	componentDidMount () {
		this.wg = new whirlyGigs(PIXI, Utils, Stats);
		this.wg.init();
	}
	addMore (e) {
		e.preventDefault();
		this.wg.addMore();
	}
	reset (e) {
		e.preventDefault();
		this.wg.reset();
	}
	render () {
		return (
			 <div id="tugtugCanvas" className="col-lg-12">
		        <div className="uiElementCont">
		        	<div id='my-stats-container'></div>
		            <div className="uiElement">
		                <button className="btn btn-default" onClick={(e) => this.addMore(e) }>add more</button>
		            </div>
		            <div className="uiElement">
		                <button className="btn btn-default" onClick={(e) => this.reset(e) }>reset</button>
		            </div>
		        </div>
		       
		    </div>
		)
	}
}