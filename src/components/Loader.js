import React from 'react';
import './Loader.css';
import LogoWithBorder from '../svgs/LogoWithBorder';


export default function Loader () {
		return (
			<div id="loading">
				<LogoWithBorder w="250" className='spinLogo' color={true} />
				<h3>¡loading!</h3>
			</div>
	    ); 
}
