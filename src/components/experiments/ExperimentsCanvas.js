import React from 'react';
import './ExperimentsCanvas.css';
import * as PIXI from 'pixi.js'
import Utils from '../../animations/utils'
import exp_anim from '../../animations/experiments_background'
export default class ExperimentsCanvas extends React.Component {

	constructor(props){
		super(props);
		this.exp_anim = {};
	}
	componentDidMount(){
		this.exp_anim = exp_anim(Utils, PIXI, this.canvas);
		this.exp_anim.Init();
	}
	componentWillUnmount(){
		this.exp_anim.Stop();
	}
	render () {
		return (
			<div id='horizLinesCanvas' ref={item => this.canvas = item} ></div>
		)
	}
	
}