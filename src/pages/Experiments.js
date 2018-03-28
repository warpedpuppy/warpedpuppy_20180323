import React from 'react';
import './Experiments.css';
import Canvas from '../components/experiments/ExperimentsCanvas';
import experimentData from '../json/experiments';
export default function Experiments () {

	
	let data =  experimentData().map((item, index) => {
		return <li key={index}>{item.title}</li>
	})
	

    return (
		<div className="experiments-page">
		  <Canvas />
		  <section className="exp_content">
			  <h2>Games &amp; Experiments</h2>
			  <div className="experiments">
				  <ul>
				  {data}
				  </ul>
				  <div className="experiments-description">
				  	  <p>Lorem ipsum dolor dsit amet, consectetur adipiscing elit. Maecenas efficitur tellus velit, sit amet mollis felis porttitor nec. Aenean lorem turpis, tempus vitae ullamcorper quis, feugiat at magna. Donec leo quam, facilisis varius lacinia at, viverra ac enim. Proin tempor, lacus et molestie tincidunt, urna elit accumsan nisi, ac malesuada arcu leo ut velit.</p>
				  </div>
			  </div>
		  </section>
		</div>
    );
}
