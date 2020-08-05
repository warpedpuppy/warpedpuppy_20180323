import React from 'react';
import './Home.css';
import HomeCanvas from '../components/HomeCanvas';
import LogoWithBorder from '../svgs/LogoWithBorder';
import { connect } from 'react-redux';

class Home extends React.Component {
	render () {
		return (
			<div className='homePage'>
			<HomeCanvas />
			<div className="textCont">
			<p>Hello!</p>
            <p>My name is Ted and I&apos;m a full stack web developer. I focus in a React front end (although I have experience with Vue) and a Node backend.</p>
            <p>I have 10+ experience in a variety of languages.</p>
            <p>I&apos;m lonely, contact me: <a href="mailto:ted@warpedpuppy.com">ted@warpedpuppy.com</a>
            </p>
            <p><a href="https://github.com/warpedpuppy" rel="noopener noreferrer" target="_blank">github</a> </p>
             {/* <p><a href="https://www.linkedin.com/in/e-w-98926a8/" rel="noopener noreferrer" target="_blank">linkedin</a> </p> */}
         
            
		      <LogoWithBorder w="250" rotate="rotate(15)" color={true} />
		     </div>
	      </div>
	    );
	}
    
}

export const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps)(Home);