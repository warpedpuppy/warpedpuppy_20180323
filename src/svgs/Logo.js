import React from 'react';
import './Logo.css';

export default function Logo(props) {
	let alpha = (props.alpha !== undefined)?props.alpha:1;
	let logoStyle = {
		width: `${props.w}px`, 
		opacity: alpha
	};
	let customClass = (props.customClass !== undefined)? props.customClass:'';
	let color = (props.color === true)?'color':'bw';
	let classes = `${color} ${customClass}`
	return (
		<svg style={logoStyle} className={classes} version="1.1" transform={props.rotate} xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 viewBox="0 0 469 331">
		<g id="Layer_2">
			<path d="M295,314.5H177.1c-55,0-100-45-100-100v-46.2c0-55,45-100,100-100H295c55,0,100,45,100,100v46.2
				C395,269.5,350,314.5,295,314.5z"/>
			<ellipse transform="matrix(0.4814 -0.8765 0.8765 0.4814 -89.5008 123.3204)" cx="59.5" cy="137.3" rx="88" ry="28.7"/>
			<ellipse transform="matrix(0.8172 -0.5763 0.5763 0.8172 -3.7049 256.9229)" cx="403.2" cy="134.3" rx="28.7" ry="88"/>
			<path className="st0" d="M262.7,306.9h-53.3c-55,0-100-45-100-100v0c0-55,45-100,100-100h53.3c55,0,100,45,100,100v0
				C362.7,261.9,317.7,306.9,262.7,306.9z"/>
			<ellipse className="st1" cx="182.1" cy="274.6" rx="71.1" ry="35.2"/>
			<ellipse className="st1" cx="287.4" cy="274.6" rx="71.1" ry="35.2"/>
			<g>
				<path className="st2" d="M209.7,322c8,0,12.3-2.4,11.7-14.2l-21-0.3C200.3,307.5,199.3,322,209.7,322z"/>
				<line className="st3" x1="210.9" y1="307.8" x2="210.9" y2="320.3"/>
			</g>
			<g>
				<polygon className="st1" points="297.4,308.5 200.3,308.5 171.7,308.5 171.7,270 297.4,270 		"/>
				<line className="st3" x1="232.5" y1="299.4" x2="232.5" y2="309.5"/>
			</g>
			<g>
				<ellipse cx="182.4" cy="230.2" rx="36" ry="62.6"/>
				<ellipse className="st1" cx="159.5" cy="218.5" rx="13.9" ry="27.1"/>
			</g>
			<g>
				<ellipse cx="286.2" cy="230.2" rx="36" ry="62.6"/>
				<ellipse className="st1" cx="264.5" cy="218.5" rx="13.9" ry="27.1"/>
			</g>
			<path d="M207.3,277c0,0,19-24,43.7-4.3l-18.5,26.7L207.3,277z"/>
		</g>
		<g id="Layer_3">
			<path className="st4" d="M218.3,68.3c0,0,58,29,100.3,9.3l20.3-61l-38.7,11.7l-21.7-20l-25,14.7L221.3,4.7L218.3,68.3z"/>
		</g>
		<g id="Layer_4">
		</g>
		</svg>

		)
}