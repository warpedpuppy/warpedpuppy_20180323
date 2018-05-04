import React from 'react';
import './Games.css';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/gameCode/bouncePig/utils.js';
import { TweenLite, TimelineLite, Back } from 'gsap';
import Loader from '../../components/Loader';
import bp from '../../animations/gameCode/bouncePig/index.js';
import ObjectPoolBuilder from '../../animations/gameCode/bouncePig/objectPool.js';
import Background from '../../animations/gameCode/bouncePig/background.js';
import Hero from '../../animations/gameCode/bouncePig/hero.js';
import BouncePlatform from '../../animations/gameCode/bouncePig/bouncePlatform.js';
import Fruit from '../../animations/gameCode/bouncePig/fruit.js';
import animate from '../../animations/gameCode/bouncePig/animate.js';
import Mines from '../../animations/gameCode/bouncePig/mines.js';
import Clouds from '../../animations/gameCode/bouncePig/clouds.js';
import Drums from '../../animations/gameCode/bouncePig/drums.js';


export default class BouncePig extends React.Component {
	componentDidMount(){
		this.game = new bp( 
			PIXI,
			ObjectPoolBuilder,
			Background,
			Hero,
			BouncePlatform,
			Fruit,
			animate, 
			Utils,
			Mines,
			Clouds,
			Drums,
			TweenLite,
			TimelineLite, 
			Back,
			this.props.loader_data);
		this.game.start();
	}
	componentWillUnmount () {
		this.game.stop();
	}
	render () {
		return (
			<div id="tugtugCanvas" className="games">
				<Loader visible={this.props.loader_data('return')} />
			</div>
	    );
	}
    
}
