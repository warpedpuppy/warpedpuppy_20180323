import React from 'react';
import * as PIXI from 'pixi.js';
import Utils from '../../animations/utils.js';
import './Games.css';
import './InfiniteBackground.css';
import InfiniteBackgroundCode from '../../animations/gameCode/smallExperiments/infiniteBackground.js';
import Loader from '../../components/Loader';

export default class InfiniteBackground extends React.Component {
	constructor(props){
		super(props);
		this.handleColChange = this.handleColChange.bind(this);
		this.handleRowChange = this.handleRowChange.bind(this);
		this.state = {
			colQ: 3,
			rowQ: 3
		}
	}
	componentDidMount () {
		this.code = new InfiniteBackgroundCode(PIXI, Utils, this.props.loader_data);
		this.code.init(this.state.colQ, this.state.rowQ);
	}
	handleColChange(e){
		this.code.changeRowCols(e.target.value, undefined);
	    this.setState({colQ:e.target.value});
	}
	handleRowChange(e){
		this.code.changeRowCols(undefined, e.target.value);
	    this.setState({rowQ:e.target.value});
	}
	addMore (e) {
		e.preventDefault();
		this.code.addMore();
	}
	reset (e) {
		e.preventDefault();
		this.code.reset();
	}
	onFormSubmit (e) {
		e.preventDefault();
	}
	componentWillUnmount () {
		this.code.Stop();
	}
	render () {
		return (
			 <div id="tugtugCanvas" className="games">
			 <Loader visible={this.props.loader_data('return')} />
				 <form className="infiniteBackgroundForm">
				 <div>
				 <label>columns:  </label>
				 <select 
				    value={this.state.colQ} 
        			onChange={this.handleColChange} 
        			>
				 	<option>2</option>
				 	<option>3</option>
				 	<option>4</option>
				 	<option>5</option>
				 	<option>6</option>
				 	<option>7</option>
				 	<option>8</option>
				 	<option>9</option>
				 	<option>10</option>
				 </select>
				 </div>
				 <div>
				 <label>rows:  </label>
				 <select 
				    value={this.state.rowQ} 
        			onChange={this.handleRowChange} 
        			>
				 	<option>2</option>
				 	<option>3</option>
				 	<option>4</option>
				 	<option>5</option>
				 	<option>6</option>
				 	<option>7</option>
				 	<option>8</option>
				 	<option>9</option>
				 	<option>10</option>
				 </select>
				 </div>
				 </form>
			 </div>
		)
	}
}