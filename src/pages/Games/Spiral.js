import React from 'react';
import * as THREE from 'three';
import Utils from '../../animations/utils'
import sprial_code from '../../animations/gameCode/smallExperiments/spiral'
import './Games.css';
export default class SpiralCanvas extends React.Component {
	constructor(props){
		super(props);
		this.spiral_anim = {};
	}
	componentDidMount(){
		this.spiral_anim = sprial_code(THREE, Utils);
		this.spiral_anim.init();
	}
	componentWillUnmount(){
		this.spiral_anim.stop();
	}
	render () {
		return (
			<div id='tugtugCanvas' className="games"></div>
		)
	}
}