import React from 'react';
import './Experiments.css';
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
import Ladybug from './Games/Ladybug.js';
import ElasticTwo from './Games/ElasticTwo.js';
import ElasticThree from './Games/ElasticThree.js';
import LongChain from './Games/LongChain.js';
import BrickBreak from './Games/BrickBreak.js';
export default class Experiments extends React.Component {
	
	constructor (props) {
		super(props);
		this.changePage = this.changePage.bind(this)
		this.state = {
			activeGame: '',
			getVar: '',
			loaded: true
		}
		this.loader_data = this.loader_data.bind(this);

	}
	loader_data (string) {
		if (string === 'on') {
			this.setState({loaded: true});
		} else if (string === 'off') {
			this.setState({loaded: false});
		} else if (string === 'return') {
			return this.state.loaded.toString();
		}
	}
	componentDidMount(){
		this.utils = Utils();
		let queryObj = this.utils.createParamObject();
		if(queryObj.game){
			this.setState({activeGame:queryObj.game})
		} else {
			this.setState({activeGame:'0'})
		}

	}
	changePage (index) {
		let minusOne = Number(index) - 1;
		this.setState({activeGame: minusOne.toString()})
	}
	render () {
		let game = [];
		if(this.state.activeGame === '') {

		} else if(this.state.activeGame === '0') {
			game.push(<Fireworks loader_data="loader_data" key={this.state.activeGame} />)
		} else if (this.state.activeGame === '1') {
			game.push(<PrettyDots loader_data={this.loader_data} key={this.state.activeGame} />)
		} else if (this.state.activeGame === '2') {
			game.push(<Glitter  loader_data={this.loader_data}  key={this.state.activeGame} />)
		} else if (this.state.activeGame === '3') {
			game.push(<FallingNumbers loader_data={this.loader_data}  key={this.state.activeGame} />)
		} else if (this.state.activeGame === '4') {
			game.push(<BouncePig  loader_data={this.loader_data} key={this.state.activeGame} />)
		} else if (this.state.activeGame === '5') {
			game.push(<Ladybug  loader_data={this.loader_data} key={this.state.activeGame} />)
		} else if (this.state.activeGame === '6') {
			game.push(<SoundSync  loader_data={this.loader_data}  key={this.state.activeGame} />)
		} else if (this.state.activeGame === '7') {
			game.push(<NodeGarden  loader_data={this.loader_data}  key={this.state.activeGame} />)
		} else if (this.state.activeGame === '8') {
			game.push(<LongChain  loader_data={this.loader_data} key={this.state.activeGame} />)
		} else if (this.state.activeGame === '9') {
			game.push(<ElasticThree  loader_data={this.loader_data} key={this.state.activeGame} />)
		} else if (this.state.activeGame === '10') {
			game.push(<WhirlyGigs  loader_data={this.loader_data} key={this.state.activeGame} />)
		} else if (this.state.activeGame === '11') {
			game.push(<ElasticTwo  loader_data={this.loader_data} key={this.state.activeGame} />)
		} else if (this.state.activeGame === '12') {
			game.push(<BrickBreak  loader_data={this.loader_data} key={this.state.activeGame} />)
			
		} 
		
		return (
			<div> 
				{game}
				<GamePagination activeGame={this.state.activeGame} onChangePage={this.changePage} />
			</div>
	    );
	}
    
}
