import React from 'react';
import './BouncePig.css';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/gameCode/bouncePig/utils.js';
import { TweenLite, TimelineLite, Back } from 'gsap';

import bp from '../../animations/gameCode/bouncePig/index.js'
import ObjectPoolBuilder from '../../animations/gameCode/bouncePig/objectPool.js'
import LevelComplete from '../../animations/gameCode/bouncePig/levelComplete.js'
import Background from '../../animations/gameCode/bouncePig/background.js'
import Hero from '../../animations/gameCode/bouncePig/hero.js'
import BouncePlatform from '../../animations/gameCode/bouncePig/bouncePlatform.js'
import Level from '../../animations/gameCode/bouncePig/level.js'
import Fruit from '../../animations/gameCode/bouncePig/fruit.js'
import Score from '../../animations/gameCode/bouncePig/score.js'
import NextLevelScreen from '../../animations/gameCode/bouncePig/nextLevelScreen.js'
import animate from '../../animations/gameCode/bouncePig/animate.js'
import StoreScore from '../../animations/gameCode/bouncePig/storeScore.js'
import Mines from '../../animations/gameCode/bouncePig/mines.js'
import Clouds from '../../animations/gameCode/bouncePig/clouds.js'
import Drums from '../../animations/gameCode/bouncePig/drums.js'


export default class BouncePig extends React.Component {
	
	componentDidMount(){
		let game = new bp( 
			PIXI,
			ObjectPoolBuilder,
			LevelComplete,
			Background,
			Hero,
			BouncePlatform,
			Level,
			Fruit,
			Score,
			NextLevelScreen, 
			animate, 
			Utils,
			StoreScore,
			Mines,
			Clouds,
			Drums,
			TweenLite,
			TimelineLite, 
			Back);
		game.start();
	}
	
	render () {
		return (
			<div> 
				<div id="warpedPuppyCanvas"></div>
			</div>
	    );
	}
    
}
