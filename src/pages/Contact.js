import React from 'react';
import './Contact.css'
import ContactForm from '../components/ContactForm.js';
import Canvas from '../components/experiments/ExperimentsCanvas';
export default function Contact () {
    return (
    	<div className="contactPage">
    	 	<Canvas />
	    	<ContactForm />
    	</div>
      
    );
}
