import React from 'react';
import * as PIXI from 'pixi.js';
import * as pixisound from 'pixi-sound';
import Utils from '../../animations/utils.js';
import './Games.css';
import soundSync from '../../animations/gameCode/smallExperiments/soundSync.js';

export default class SoundSync extends React.Component {

	componentDidMount () {
		 
		this.code = new soundSync(PIXI, Utils, pixisound);
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
			 <div id="tugtugCanvas" className="games"></div>
			 </div>
		)
	}
}