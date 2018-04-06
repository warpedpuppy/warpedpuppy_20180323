import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import { TweenLite } from 'gsap';
import BrickBreakCode from '../../animations/gameCode/brickBreak/index.js';
import Setting from '../../animations/gameCode/brickBreak/setting.js';
import Bricks from '../../animations/gameCode/brickBreak/bricks.js';
import Paddle from '../../animations/gameCode/brickBreak/paddle.js';
import Ball from '../../animations/gameCode/brickBreak/ball.js';
export default class BrickBreak extends React.Component {

	componentDidMount () {
		 
		this.code = new BrickBreakCode(PIXI, Utils, Setting, TweenLite,Bricks, Paddle, Ball);
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