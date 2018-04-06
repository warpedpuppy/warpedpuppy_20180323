import React from 'react';
import './ContactForm.css';

export default class ContactForm extends React.Component {

	render () {
		return (
			<fieldset><legend>Contact</legend>
			<form onSubmit={(e) => this.onFormSubmit(e)}>
				<input type="email" placeholder="email address " />
				<input type="text" placeholder="name" />
				<textarea></textarea>
				<div className="buttonDiv">
					<input type="submit" value="send message" />
				</div>
			</form>
			</fieldset>
		)
	}
	
}