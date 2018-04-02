import React from 'react';
import './Experiments.css';
import Canvas from '../components/experiments/ExperimentsCanvas';
import experimentData from '../json/experiments';
import { Link } from 'react-router-dom';
export default class Experiments extends React.Component {

	constructor(props){
		super(props)
		let array = experimentData();
		this.state = {
			page: 0,
			desc: 0,
			array: array,
			itemsPerPage: 6, 
			pages: 0

		}
		

	}
	componentDidMount(){
		this.setState({
			pages: Math.ceil(this.state.array.length/this.state.itemsPerPage)
		})
	}
	changePage(e){
		e.preventDefault();
		let nextPage = (Number(e.target.innerHTML) * this.state.itemsPerPage) - this.state.itemsPerPage;
		this.setState({page:nextPage})
		let descNum = (Number(e.target.innerHTML)-1)*this.state.itemsPerPage;
		this.setState({desc: descNum})

	}
	changeDescription(e) {
		e.preventDefault();
		this.setState({desc: Number(e.target.getAttribute('data-ref'))})
	}
	
	
	render() {
		let data =  [];
		let end = this.state.page + this.state.itemsPerPage;
		for(let i = this.state.page; i < end; i++){
			if(this.state.array[i]) {
				data.push(
					<li key={i} ref={item => this[`item${i}`] = item} onClick={(e) => this.changeDescription(e)} >
					<div data-ref={i} >
					{this.state.array[i].title}
					<hr />
					</div>
					</li>)
			}
			
		}
		let pagination = [];
		let description = this.state.array[this.state.desc].description;
		let link = this.state.array[this.state.desc].link;
		let temp = this.state.page/this.state.itemsPerPage;
		for(let i = 0; i < this.state.pages; i++){
			let page = i + 1;
			let key2 = i + this.state.array.length;
			let classes = (temp === i)?`pageLink activeLink`:`pageLink`;
			pagination.push(
			<span 
			key={i}
			onClick={(e) => this.changePage(e)} 
			className={classes}> {page} </span>)

			if(i !== this.state.pages-1) {
				pagination.push(<span key={key2}>|</span>)
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
				  	  <div>{description}</div>
				  	  <Link to={link}>visit experiment</Link>
				  </div>
			  </div>
		  </section>
		</div>
    );
	}
    
}
