import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import soundSync from '../../animations/gameCode/smallExperiments/soundSync.js';
import Loader from '../../components/Loader';
import * as PixiSound from 'pixi-sound';

export default class SoundSync extends React.Component {
	componentDidMount () {
		this.code = new soundSync(PIXI, Utils, this.props.loader_data, PixiSound);
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