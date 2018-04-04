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
		console.log(experimentData().length)
	}

	changeText (e) {
		let str = e.target.innerHTML;
		let response = "";
		if (str === "&lt;&lt;") {
			response = 'go five back'
		} else if (str === "&lt;") {
			response = 'go one back'
		} else if (str === "&gt;") {
			response = 'go one forward'
		} else if (str === "&gt;&gt;") {
			response = 'go five forward'
		} else {
			response = this.state.array[str].title;
		}	
		this.setState({
			paginationText: response
		})
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
			response = 'go one forward'
			if (num + 4 < max && newActivePage >= num + 4) {
				newNumber = num + 1;
			}
			if(newActivePage < 8){
				newActivePage ++;
			}
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
	changeAnim (e) {
		this.setState({activePage:Number(e.target.innerHTML)})
	}

	render () {
		let buttons = [];
		for(let i = 0; i < 5; i++){
			let num = this.state.startingNumber + i;
			let classes = (num === this.state.activePage)?`activeSpan`:``;
			let link = this.state.array[num].link;
			buttons.push(
			<Link key={i} to={link}>
				<span 
					className={classes} 
					onClick={(e) => this.changeAnim(e)}
					onMouseEnter={(e) => this.changeText(e)}
					onMouseLeave={(e) => this.emptyText(e)}
				>{num}</span>
			</Link>
			)
		}
		
		return (
			<div className="gamePagination">
				<div className="paginationText">{this.state.paginationText}</div>
				<div className="pagination">
					<span 
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
						onClick={(e) => this.changeNumbers(e)}
					>&lt;&lt;</span>
					<span 
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
						onClick={(e) => this.changeNumbers(e)}
					>&lt;</span>
					{buttons}
					<span 
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
						onClick={(e) => this.changeNumbers(e)}
					>&gt;</span>
					<span 
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
						onClick={(e) => this.changeNumbers(e)}
					>&gt;&gt;</span>
				</div>
			</div>

			)
	}

}