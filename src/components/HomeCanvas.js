import React from 'react';
import './HomeCanvas.css';
import * as PIXI from 'pixi.js'
import Utils from '../animations/utils'
import home_page from '../animations/home_page'
export default class HomeCanvas extends React.Component {

	componentDidMount(){
		let homePage = home_page(Utils, PIXI, this.canvas);
		homePage.Init();
	}
	render () {
		return (
			<div id='homeCanvas' ref={item => this.canvas = item} >ain't got canvas ability!</div>
		)
	}
	
}