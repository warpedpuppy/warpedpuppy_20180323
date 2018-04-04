import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import NodeGardenCode from '../../animations/gameCode/smallExperiments/nodeGarden.js';

export default class NodeGarden extends React.Component {

	componentDidMount () {
		this.code = new NodeGardenCode(PIXI,Utils);
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