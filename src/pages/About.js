import React from 'react';
import './About.css'
import { TweenMax } from 'gsap';
import AboutCanvas from '../components/AboutCanvas';
export default class About extends React.Component {
	constructor(props){
       super(props);
       this.state = {
          login:true
       }
    }
    componentDidMount () {
    	
    }
    componentWillUnmount () {
      TweenMax.killAll()
    }
   
	render(){
    return (
    	<div className="aboutPage">
      <AboutCanvas />
      <div className="text">
	      <h2>more than you ever wanted to know about me</h2>
        <ul>
          <li>Graduated from U.C. Berkeley with Honors.</li>
          <li>Graduated from U.C. Hastings, College of the Law.  
          <ul>
          <li>Won grant to work with International Gay and Lesbian Human Rights Commission.</li>
          <li>Passed the California and Connecticut bar examinations.</li>
          </ul>
          </li>
  	      <li>Attended coding school at San Francisco&apos;s Academy X.</li>
          <li>Worked for an educational game company, programming games.</li>
          <li>Worked for an app development company and coded 6 mobile apps.</li>
          <li>Worked for The Dodo and coded the front end viewed by 17 million people per month.</li>
          <li>Managed a subscription based ecommerce site built in VueJS.</li>
          <li>Mentor at Thinkful.com.</li>
          <a href="/ebw_resume.pdf">cv</a>
        </ul>
	      </div>
        </div>
    )
}
}

