import React from 'react';
import './ContactForm.css';
import axios from 'axios';
import emailAddress from '../svgs/email.svg';

export default class ContactForm extends React.Component {
	constructor (props) {
		super(props);
		this.state= {
			name: '',
			email: '',
			message: 'thrill me, baby!'
		}
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}
	onFormSubmit (e) {
		e.preventDefault();
		let that = this;
		let params = new URLSearchParams();
		params.append('name', this.state.name);
		params.append('email', this.state.email);
		params.append('message', this.state.message);
		// let url1 = '//tryingsomething.com/warpedpuppy/contactFormHandler.php';
		// let url2 = '//localhost:8000/warpedpuppy/contactFormHandler.php';
		let url3 = '//localhost:8000/mail.php';
		let url4 = '//tryingsomething.com/mail.php';
		axios.post(url4, params)
		.then(function (response) {
		    console.log(response);
		    that.setState({
		    	name: '',
		    	email: '',
		    	message: 'thrill me again, baby!'
		    })
		})
		.catch(function (error) {
		    console.error('error = ', error);
		});
	}
	onChangeInputValue(e){
		let obj ={};
		obj[e.target.name] = e.target.value;
		this.setState(obj)
	}
	clearMessage () {
		this.setState({message: ''});
	}
	//
	//action="//formspree.io/wp@tugtug.com"
	render () {
		return (
			<div>
			<h2 className="contactPageTitle">Contact</h2>
			<form method="POST" onSubmit={(e) => this.onFormSubmit(e)} >
				<input 
				type="text"
				name="name" 
				placeholder="name" 
				value={this.state.name}
				onChange={(e) => {this.onChangeInputValue(e)}} 
				required />

				<input 
				type="email" 
				name="email" 
				placeholder="email"
				value={this.state.email} 
				onChange={(e) => {this.onChangeInputValue(e)}} 
				required />

				<textarea 
				name="message" 
				value={this.state.message}
				onFocus={() => this.clearMessage()}
				onChange={(e) => {this.onChangeInputValue(e)}}
				required ></textarea>
				<input type="hidden" name="_subject" value="New submission!" />
				<input type="text" name="_gotcha" style={{"display":"none"}} />
				<input type="hidden" name="_next" value="/contact" />
				<div className="buttonDiv">
					<input type="submit" value="send" />
				</div>
				<div className="emailResponse">{this.state.response}</div>
			</form>
			<a href="mailto:info@warpedpuppy.com">
			<img src={emailAddress} alt='email_address' />
			</a>
			</div>
			
		)
	}
	
}