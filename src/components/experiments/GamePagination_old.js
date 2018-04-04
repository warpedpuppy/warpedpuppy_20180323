import React from 'react';
import './GamePagination.css';
import experimentData from '../../json/experiments';
import { Link } from 'react-router-dom';
export default class GamePagination extends React.Component {

	constructor (props, context) {
		super(props);
		this.state = {
			paginationText: '',
			currentPage: window.location.pathname,
			activePage: 1,
			startingNumber: 1,
			array: experimentData()
		}
	}
	componentDidMount () {
		console.log("pagination props = ", this.props)
		// function findPageIndex(element){
		// 	return element.link === this.state.currentPage;
		// }
		// findPageIndex = findPageIndex.bind(this);
		// let activeIndex = this.state.array.findIndex(findPageIndex);
		// this.setState({activePage: activeIndex})
	}
	changeText (e) {
		// let str = e.target.innerHTML;
		// let response = "";
		// if (str  == this.state.activePage) {
		// 	return;
		// } else if (str === "&lt;&lt;") {
		// 	response = 'go five back'
		// } else if (str === "&lt;") {
		// 	response = 'go one back'
		// } else if (str === "&gt;") {
		// 	response = 'go one forward'
		// } else if (str === "&gt;&gt;") {
		// 	response = 'go five forward'
		// } else {
		// 	let index = Number(str) - 1;
		// 	response = this.state.array[index].title;
		// }	
		// this.setState({
		// 	paginationText: response
		// })
	}
	changeNumbers (e) {
		let str = e.target.innerHTML,
		    response = "",
		    newNumber = this.state.startingNumber,
		    num = this.state.startingNumber,
		    max = this.state.array.length,
		    newActivePage = this.state.activePage;
		if (str === "&lt;&lt;") {
			response = 'go five back'
			if (num > 5) {
				newNumber = num - 5; 
			} else {
				newNumber = 1;
			}
		} else if (str === "&lt;") {
			response = 'go one back'
			if(num > 1 && newActivePage <= newNumber){
				newNumber = num - 1;
			}
			if(newActivePage >1){
				newActivePage --;
			}
		} else if (str === "&gt;") {
			response = 'go one forward';
			let newIndex = Number(str) + 1;
			// if (num + 4 < max && newActivePage >= num + 4) {
			// 	newNumber = num + 1;
			// }
			// if(newActivePage < 8){
			// 	newActivePage ++;
			// }
		} else if (str === "&gt;&gt;") {
			response = 'go five forward'
			if (num + 9 < max) {
				newNumber = num + 5;
				newActivePage += 5;
			} else {
				newNumber = max - 4;
				newActivePage = newNumber;
			}
		} else {
			//BrowserRouter.push("/");
		}
		this.setState({
			paginationText: response,
			startingNumber: newNumber,
			activePage: newActivePage
		})
	}
	emptyText (e) {
		// let str = e.target.innerHTML;
		// let response = "";
		// if (str === "&lt;&lt;") {
		// 	response = 'go five back'
		// } else if (str === "&lt;") {
		// 	response = 'go one back'
		// } else if (str === "&gt;") {
		// 	response = 'go one forward'
		// } else if (str === "&gt;&gt;") {
		// 	response = 'go five forward'
		// }		
		this.setState({
			paginationText: ''
		})
	}
	// changeAnim (e) {
	// 	this.setState({activePage:Number(e.target.innerHTML)})
	// }

	render () {
		let buttons = [],
		    i,
		    link,
		    indexNumber;

		let test = (this.state.activePage > 1)?this.state.activePage - 1:1;
		link = this.state.array[test].link;

		buttons.push(
			<Link key={100} to={link}>
			<span 
				onMouseEnter={(e) => this.changeText(e)}
				onMouseLeave={(e) => this.emptyText(e)}
			>&lt;</span>
			</Link>
			)


		for(i = 0; i < 5; i++){
			let num = this.state.startingNumber + i;
			indexNumber = num - 1;
			let classes = (this.state.currentPage === this.state.array[indexNumber].link)?`activeSpan`:``;
			link = this.state.array[indexNumber].link;
			buttons.push(
			<Link key={i} to={link}>
				<span 
					className={classes} 
					onMouseEnter={(e) => this.changeText(e)}
					onMouseLeave={(e) => this.emptyText(e)}
				>{num}</span>
			</Link>
			)
		}

		i++;
		test = this.state.activePage + 1;
		link = this.state.array[test].link;
		buttons.push(
			<Link key={i} to={link}>
			<span 
				onMouseEnter={(e) => this.changeText(e)}
				onMouseLeave={(e) => this.emptyText(e)}
			>&gt;</span>
			</Link>
			)


		return (
			<div className="gamePagination">
				<h2>{this.state.array[this.state.activePage].title}</h2>
				<div className="paginationText">{this.state.paginationText}</div>
				<div className="pagination">
					<span 
						className="fiveBack"
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
						onClick={(e) => this.changeNumbers(e)}
					>&lt;&lt;</span>
					{buttons}
					<span
						className="fiveForward"
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
						onClick={(e) => this.changeNumbers(e)}
					>&gt;&gt;</span>
				</div>
			</div>

			)
	}

}