import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component {
	  constructor(props) {
		super(props);
		this.state = {
			showDropDown:false
		}
	  }
	  showDropDown(e){
	  	this.setState({
	  		showDropDown: !this.state.showDropDown
	  	})
	  }
	  render() {

	  	// let loginClass = (this.state.loginShow)?'':'hide';
	  	let showDropDownClass = (this.state.showDropDown)?'open':'';
	    return (
			<div>
				<nav>
					<div className="not-links">
						<h1>wp</h1>
						<div className="hamburger" onClick={() => this.showDropDown()}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<div  className={`links  ${showDropDownClass}`}>
						<Link to="/">Home</Link>
						<Link to="/Alternate">Alternate</Link>
					</div>
					
				</nav>
			</div>
	    );
	  }
}
