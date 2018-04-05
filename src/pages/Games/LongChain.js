import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import LongChainCode from '../../animations/gameCode/smallExperiments/longChain.js';
export default class LongChain extends React.Component {

	componentDidMount () {
		 
		this.code = new LongChainCode(PIXI, Utils);
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