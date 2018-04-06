import React from 'react';
import './About.css'
import { TweenMax } from 'gsap';
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
      <div>
	      <h1>About</h1>
        <p>Graduated from U.C. Berkeley with Honors.</p>
        <p>Graduated from U.C. Hastings Law School.  Won grant to work with International Gay and Lesbian Human Rights Commission. Passed the California and Connecticut bar examinations.</p>
	      <p>Attended two years of coding school at San Francisco&apos;s Academy X.</p>
        <p>Built a lot of web sites.</p>
        <p>Worked for an educational game company and coded a whooooooooole log of games.</p>
        <p>Worked for an app development company and coded 6 mobile apps.</p>
        <p>Worked for The Dodo and coded content viewed by 17 million people per month.</p>
        <p>Managed a subscription based ecommerce site built in VueJS.</p>
        <p>Mentor at Thinkful.com.</p>
	      </div>
        </div>
    )
}
}

