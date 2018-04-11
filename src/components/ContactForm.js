import React from 'react';
import './ContactForm.css';
import axios from 'axios';

export default class ContactForm extends React.Component {

	onFormSubmit (e) {
		e.preventDefault();
		axios.post('//tryingsomething.com/mail.php', {
		    firstName: 'Fred',
		    lastName: 'Flintstone'
		})
		.then(function (response) {
		    console.log(response);
		})
		.catch(function (error) {
		    console.error('error = ', error);
		});
	}
	render () {
		return (
			
			<form method="POST" onSubmit={(e) => this.onFormSubmit(e)} >
				<input type="email" name="email" placeholder="email address " />
				<input type="text" name="name" placeholder="name" />
				<textarea name="message"></textarea>
				<input type="hidden" name="_subject" value="New submission!" />
				<input type="text" name="_gotcha" style={{"display":"none"}} />
				<input type="hidden" name="_next" value="/contact" />
				<div className="buttonDiv">
					<input type="submit" value="send" />
				</div>
			</form>
			
		)
	}
	
}