import React from 'react';
import './GamePage.css';
import PIXI from 'pixi.js';
import Utils from '../animations/utils.js';
import {TweenLight} from 'gsap';

import bp from '../animations/gameCode/bouncePig/index.js'
import ObjectPoolBuilder from '../animations/gameCode/bouncePig/objectpool.js'
// import LevelComplete from '../animations/gameCode/bouncePig/levelComplete.js'
// import Background from '../animations/gameCode/bouncePig/background.js'
// import Hero from '../animations/gameCode/bouncePig/hero.js'
// import BouncePlatform from '../animations/gameCode/bouncePig/bouncePlatform.js'
// import Level from '../animations/gameCode/bouncePig/level.js'
// import Fruit from '../animations/gameCode/bouncePig/fruit.js'
// import Score from '../animations/gameCode/bouncePig/score.js'
import NextLevelScreen from '../animations/gameCode/bouncePig/nextLevelScreen.js'
// import requestAnimFrame from '../animations/gameCode/bouncePig/requestAnimFrame.js'
// import ObjectPoolBuilder from '../animations/gameCode/bouncePig/objectpool.js'
// import createjs from 'createjs'

export default class GamePage extends React.Component {
	// constructor(props){
	// 	super(props);
	// 	this.state = {
	// 		scriptURL: "",
	// 		bouncePig: bouncePig
	// 	}
	// }
	componentDidMount(){
		let utils = new Utils();
		let game = new bp(
			PIXI, 
			utils);
		game.start();
	
	}
	
	render () {
		return (
			<div> 
				<div id="warpedpuppycanvas"></div>
			</div>
	    );
	}
    
}
