import React from 'react';
import './Experiments.css';
import Canvas from '../components/experiments/ExperimentsCanvas';
export default function Experiments () {

	let experments = ['insect ai', 'whirley gigs', "glitter -- object pool", 'slide puzzle', 'falling green numbers', '4 card oop solitaire', 'fireworks', 'pretty dots', 'dynamic gradients', 'paralax layers', 'webgl sun animation', 'pixi displacement filter', 'four card solitaire', 'web gl experiment', 'test gear page', 'chess layout', 'brick break', 'bitmap font and sound sync', 'tic tac toe', 'geodesic lines'].map((item, index) => {
		return <li key={index}>{item}</li>
	})
	let games = ['solitaire', 'bounce, pig, bounce'].map((item, index) => {
		return <li key={index}>{item}</li>
	})

    return (
		<div className="experiments-page">
		  <Canvas />
		  <section className="exp_content">
			  <h2>Games &amp; Experiments</h2>
			  <div className="buttonCont">
				  <button>webgames</button>
				  <button>experiments</button>
				  <div className="webGames">
				  <ul>
				  {games}
				  </ul>
				  </div>
				  <div className="experiments">
				  <ul>
				  {experments}
				  </ul>
				  </div>
			  </div>
		  </section>
		</div>
    );
}
