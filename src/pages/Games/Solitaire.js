import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import SolitaireCode from '../../animations/gameCode/solitaireWithAI/index.js';
import Loader from '../../components/Loader';

export default class Solitaire extends React.Component {

	componentDidMount () {
		this.code = new SolitaireCode(PIXI, Utils, this.props.loader_data);
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
			<div id="tugtugCanvas" className="games">
			<Loader visible={this.props.loader_data('return')} />
			</div>
		)
	}
}