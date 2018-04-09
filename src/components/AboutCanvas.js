import React from 'react';
import './AboutCanvas.css';
import * as PIXI from 'pixi.js'
import Utils from '../animations/utils'
import about_page from '../animations/about_page';
import { TimelineMax, BezierPlugIn, Power1 } from 'gsap';
export default class AboutCanvas extends React.Component {

	constructor(props){
		super(props);
		this.about_page = {};
	}
	componentDidMount(){
		this.about_page = about_page(PIXI, Utils, TimelineMax, BezierPlugIn, Power1);
		this.about_page.init();
	}
	componentWillUnmount(){
		this.about_page.stop();
	}
	render () {
		return (
			<div id='aboutCanvas' ref={item => this.canvas = item} ></div>
		)
	}
	
}