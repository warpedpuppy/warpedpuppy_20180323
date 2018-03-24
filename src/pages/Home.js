import React from 'react';
import './Home.css';
import HomeCanvas from '../components/HomeCanvas';
import {connect} from 'react-redux';
import { addItem } from '../actions/index.js';

class Home extends React.Component {
	// constructor(props){
	// 	super(props);
	// }
	// addItemHandler(){
	// 	this.props.dispatch(addItem(5))
	// }
	render () {
		return (
			<div class='homePage'>
			<HomeCanvas />
		      
		     
	      </div>
	    );
	}
    
}

export const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps)(Home);