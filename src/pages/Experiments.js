import React from 'react';
import './Experiments.css';
import * as PIXI from 'pixi.js';
import Utils from '../animations/utils.js';
import GamePagination from '../components/experiments/GamePagination.js';
import BouncePig from './Games/BouncePig.js';
import WhirlyGigs from './Games/WhirlyGigs.js';
import Glitter from './Games/Glitter.js';
import FallingNumbers from './Games/FallingNumbers.js';
import Fireworks from './Games/Fireworks.js';
import PrettyDots from './Games/PrettyDots.js';
import SoundSync from './Games/SoundSync.js';
import NodeGarden from './Games/NodeGarden.js';
import LegsWalking from './Games/LegsWalking.js';
import PlayBall from './Games/PlayBall.js';
import Ladybug from './Games/Ladybug.js';
export default class Experiments extends React.Component {
	
	constructor (props) {
		super(props);
		this.changePage = this.changePage.bind(this)
		this.state = {
			activeGame: '0'
		}

	}
	componentDidMount(){
		this.utils = Utils();
		let queryObj = this.utils.createParamObject();
		if(queryObj.game){
			this.setState({activeGame:queryObj.game})
		}
		//this.game.init();
	}
	componentWillUnmount () {
		//this.game.stop();
	}
	changePage (index) {
		let minusOne = Number(index) - 1;
		console.log("new activeGame", minusOne)
		this.setState({activeGame: minusOne.toString()})
	}
	render () {
		let game = [];
		if(this.state.activeGame === '0') {
			game.push(<Ladybug key={this.state.activeGame} />)
		} else if(this.state.activeGame === '1') {
			game.push(<WhirlyGigs key={this.state.activeGame} />)
		} else if(this.state.activeGame === '2') {
			game.push(<Glitter  key={this.state.activeGame} />)
		} else if(this.state.activeGame === '3') {
			game.push(<FallingNumbers  key={this.state.activeGame} />)
		} else if(this.state.activeGame === '4') {
			game.push(<Fireworks  key={this.state.activeGame} />)
		} else if(this.state.activeGame === '5') {
			game.push(<PrettyDots  key={this.state.activeGame} />)
		} else if(this.state.activeGame === '6') {
			game.push(<SoundSync  key={this.state.activeGame} />)
		} else if(this.state.activeGame === '7') {
			game.push(<NodeGarden  key={this.state.activeGame} />)
		} else if(this.state.activeGame === '8') {
			game.push(<BouncePig  key={this.state.activeGame} />)
		} else if(this.state.activeGame === '9') {
			game.push(<PlayBall key={this.state.activeGame} />)
		}
		
		return (
			<div> 
				{game}
				<GamePagination activeGame={this.state.activeGame} onChangePage={this.changePage} />
			</div>
	    );
	}
    
}
