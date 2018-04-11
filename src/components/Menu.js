import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import Logo from '../svgs/Logo';
import Utils from '../animations/utils.js';
import axios from 'axios';

export default class Menu extends Component {
	  constructor(props) {
		super(props);
		this.state = {
			showDropDown:false,
			cc:'?cc=testing'
		}
	  }
	  checkRemoteCCValue () {
	  		let params = new Utils().createParamObject();
			let testC = Date.now();
			axios.get(`//tryingsomething.com/cc.php?test=${testC}`)
			 .then(function (response) {

			    if (!params.cc || params.cc !== response.data.cc.cc) {
			    	console.log('they are not equal')
			    	let newCC = '?cc='+response.data.cc.cc;
			    	let newURL = window.location.origin + window.location.pathname + newCC;
			  
			    	params.cc = response.data.cc.cc;
			    	window.location = newURL;
			    	this.setState({cc: newCC})
			    } else {
			    	this.setState({cc: params.cc})
			    }

			    // this.setState({cc: `?cc=${response.data.cc.cc}`})

			  })
			  .catch(function (error) {
			    //console.log(error);
			  });
	  }
	  showDropDown(e){
	  	this.setState({
	  		showDropDown: !this.state.showDropDown
	  	})
	  }
	  componentDidMount () {
	  	let params = new Utils().createParamObject();
	  	this.setState({cc: `?cc=${params.cc}`})
	  	this.checkRemoteCCValue();
	  }
	  componentDidUpdate () {
	  	// console.log('update', this.state)
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
