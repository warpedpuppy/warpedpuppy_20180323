import React from 'react';
import './Loader.css';
import LogoWithBorder from '../svgs/LogoWithBorder';


export default class Loader extends React.Component {
		constructor (props) {
			super(props);
			this.state = {
				loader: []
			};
		}
		componentDidMount () {
			this.setState({
				loader: [
					<div key="0">				
					
					</div>
				]
			}) 
		}
		render () {
			return (
				<div id="loading" className="loading_container" key='0'>
					<LogoWithBorder w="250" className='spinLogo' color={true} />
					<h3>¡loading!</h3>
				</div>
	    	); 
		}
		
		
}
