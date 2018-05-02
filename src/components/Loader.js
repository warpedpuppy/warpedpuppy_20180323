import React from 'react';
import './Loader.css';
import LogoWithBorder from '../svgs/LogoWithBorder';


export default function Loader (props) {


			let showMenuClass = (props.visible === 'true')?'loader_visible':'loader_hide';
			return (
				<div id="loading" className={`loading_container  ${showMenuClass}`}>
					<LogoWithBorder w="250" className='spinLogo' color={true} />
					<h3>¡loading!</h3>
				</div>
	    	); 
		
		
		
}
