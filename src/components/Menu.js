import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import Logo from '../svgs/Logo';

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
					   <Logo customClass="menuLogo" w={70} alpha={0.5}/>
						<h1>warped puppy</h1>
						<div className="hamburger" onClick={() => this.showDropDown()}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<div className={`links  ${showDropDownClass}`}>
						<Link to="/">Home</Link>
						<Link to="/Alternate">Alternate</Link>
					</div>
					
				</nav>
			</div>
	    );
	  }
}
