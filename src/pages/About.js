import React from 'react';
import './About.css'
import { TweenMax, Elastic } from 'gsap';
export default class About extends React.Component {
	constructor(props){
       super(props);
       this.state = {
          login:true
       }
    }
    componentDidMount () {
    	this.registerActive()
    }
    componentWillUnmount () {
     TweenMax.killAll()
    }
    loginActive(){
      TweenMax.to(this.path2,2,{morphSVG: this.path2, ease: Elastic.easeOut, css:{fill:"#FF0000"}, onComplete: this.registerActive.bind(this)})
    }
    registerActive(){
       TweenMax.to(this.path2,2,{morphSVG: this.path1, ease: Elastic.easeOut, css:{fill:"#FF00FF"}, onComplete: this.loginActive.bind(this)})
    }
	render(){
    return (
    	<div>
      <script src="/js/gsap/MorphSVGPlugin.js" type="text/javascript"></script>
	      <h1>About</h1>
	      <svg x="0px" y="0px" viewBox="0 0 559 368">
	          <g id="end">
	            <path  ref={item => this.path1 = item} className="st0_about" d="M67.7,133.1c-11.7,11.9-60.7,64-48,117c16.1,67.4,119.9,85.4,169,94c42.9,7.5,98.2,17.1,157-13
	              c15.7-8.1,81.1-41.6,95-103c8.2-36.3-4.9-68,18-89c9.9-9,15.3-5.9,37-18c15.4-8.6,50.1-27.9,51-47c1.5-31.9-89.7-85.7-160-63
	              c-46.5,15-43.9,50.6-94,65c-47.7,13.7-68.9-13.2-121-5C144.7,75.4,107.9,89.4,67.7,133.1z"/>
	          </g>
	          <g id="start">
	            <path  ref={item => this.path2 = item} className="st1_about" d="M229.2,52.7c171.4-11.1,240.4-31.1,257.7,1.2c10.5,19.6-11.8,32.5-5.8,71.1c9.2,59.3,68.4,70.6,67.6,106.1
	              c-0.9,43.7-91.9,99.1-176.1,88.6c-76.5-9.5-82.1-65.3-166.8-84c-95.5-21-152.4,35.8-179.6,5.8c-28.1-30.9,1.7-125.1,64.1-166.8
	              C119.5,55.5,139.1,58.5,229.2,52.7z"/>
	          </g>
	          </svg>
	      </div>
    )
}
}
