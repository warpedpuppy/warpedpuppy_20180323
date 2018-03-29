import React from 'react';
import './Experiments.css';
import Canvas from '../components/experiments/ExperimentsCanvas';
import experimentData from '../json/experiments';

export default class Experiments extends React.Component {

	constructor(props){
		super(props)
		let array = experimentData();
		this.state = {
			page: 0,
			array: array,
			pages: Math.ceil(array.length/4)

		}
	}
	changePage(e){
		e.preventDefault();
		console.log(e.target.ref)

	}
	
	
	render() {
		let data =  [];
		let end = this.state.page + 4;
		for(let i = this.state.page; i < end; i++){
			data.push(<li key={i}>{this.state.array[i].title}</li>)
		}
		let pagination = [];
		for(let i = 0; i < this.state.pages; i++){

			let page = i + 1;
			pagination.push(
			<span 
			onClick={(e) => this.changePage(e)} 
			ref={item => this[page] = item} 
			className="pageLink"> {page} 
			</span>)

			if(i !== this.state.pages-1) {
				pagination.push(<span>|</span>)
			}
		}

		
		return (
		<div className="experiments-page">
		  <Canvas />
		  <section className="exp_content">
			  <h2>Games &amp; Experiments</h2>
			  <div className="experiments">
			  	  <div className="pagination">{pagination}</div>
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
    
}
