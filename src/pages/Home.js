import React from 'react';
import './Home.css';
import {connect} from 'react-redux';
import { addItem } from '../actions/index.js';

class Home extends React.Component {
	// constructor(props){
	// 	super(props);
	// }
	addItemHandler(){
		this.props.dispatch(addItem(5))
	}
	render () {
		return (
			<div>
		      <h1>home</h1>
		      <button onClick={(e) => this.addItemHandler()} >add item</button>
		      {this.props.items}
	      </div>
	    );
	}
    
}

export const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps)(Home);