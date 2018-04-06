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
	  	let showDropDownClass = (this.state.showDropDown)?'open':'';
	  	
	    return (
			<div>
				<nav>
					<div className="not-links">
						<Link className="homeLink" to="/" onClick={() => this.showDropDown()} >
						   <Logo customClass="menuLogo" w={70} alpha={0.5}/>
							<h1>warped puppy</h1>
							</Link>
						<div className="hamburger" onClick={() => this.showDropDown()}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<div className={`links  ${showDropDownClass}`}>
						<Link to="/experiments"  onClick={() => this.showDropDown()} >
						<span>js / canvas experiments</span>
						</Link>
						<Link to="/about"  onClick={() => this.showDropDown()} >
						<span>about / cv</span>
						</Link>
						<Link to="/contact"  onClick={() => this.showDropDown()} >
						<span>contact</span>
						</Link>
					</div>
					
				</nav>
			</div>
	    );
	  }
}
