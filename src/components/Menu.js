import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import Logo from '../svgs/Logo';
import Utils from '../animations/utils.js';
import CacheValue from '../json/cc.js';

export default class Menu extends Component {
	  constructor(props) {
		super(props);
		this.state = {
			showDropDown:false,
			cc:''
		}
	  }
	  showDropDown(e){
	  	this.setState({
	  		showDropDown: !this.state.showDropDown
	  	})
	  }
	  componentDidMount () {
	  	let cc = CacheValue().cc;
	  	let params = new Utils().createParamObject();
	  	this.setState({cc: `?cc=${cc}`})
	  	if(!params.cc || params.cc !== cc) {
	  		let current = window.location.origin + window.location.pathname + `?cc=${cc}`
	  		window.location = current;
	  	}
	  }
	  componentDidUpdate () {
	  	// let cc ="asdf";
	  	// let params = new Utils().createParamObject();
	  	// if(!params.cc || params.cc !== cc) {
	  	// 	// let current = window.location.href + `?cc=${cc}`
	  	// 	// window.location = current
	  	// }
	  	// this.setState({cc: `?cc=${cc}`})
	  	// console.log(window.location.href)
	  	// console.log('params = ', params);
	  	// let CC = new CC();
	  	// console.log(cc)
	  }

	  render() {
	  	let showDropDownClass = (this.state.showDropDown)?'open':'';
	  	let homeLink = `/${this.state.cc}`;
	  	let experimentsLink = `/experiments${this.state.cc}`;
	  	let aboutLink = `/about${this.state.cc}`;
	  	let contactLink = `/contact${this.state.cc}`
	    return (
			<div>
				<nav>
					<div className="not-links">
						<Link className="homeLink" to={homeLink} onClick={() => this.showDropDown()} >
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
						<Link to={experimentsLink}  onClick={() => this.showDropDown()} >
						<span>js / canvas experiments</span>
						</Link>
						<Link to={aboutLink}  onClick={() => this.showDropDown()} >
						<span>about / cv</span>
						</Link>
						<Link to={contactLink}  onClick={() => this.showDropDown()} >
						<span>contact</span>
						</Link>
					</div>
					
				</nav>
			</div>
	    );
	  }
}
