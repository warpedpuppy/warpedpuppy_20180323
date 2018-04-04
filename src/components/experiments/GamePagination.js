import React from 'react';
import './GamePagination.css';
import experimentData from '../../json/experiments';
import { Link } from 'react-router-dom';
export default class GamePagination extends React.Component {

	constructor (props, context) {
		super(props);
		this.state = {
			paginationText: '',
			activePage: this.props.activeGame,
			startingNumber: 1,
			array: experimentData(),
			blankText: '-'
		}
	}
	changeText (e) {
		let str = e.target.innerHTML;
		let response = "";
		if (str  == this.state.activePage || str === this.state.blankText) {
			return;
		} else if (str === "&lt;&lt;") {
			response = 'go five back'
		} else if (str === "&lt;") {
			response = 'go one back'
		} else if (str === "&gt;") {
			response = 'go one forward'
		} else if (str === "&gt;&gt;") {
			response = 'go five forward'
		} else {
			let index = Number(str) - 1;
			response = this.state.array[index].title;
		}	
		this.setState({
			paginationText: response
		})
	}

	emptyText (e) {
		this.setState({
			paginationText: ''
		})
	}
	handleChange (num) {
		let max = this.state.array.length;
		if(num === this.state.blankText){
			return;
		} else if (num === "one_forward") {
			let nextGame = Number(this.props.activeGame) + 2;
			let topNumber = this.state.startingNumber + 5;
			if(nextGame > max){
				return
			} else if(nextGame === topNumber) {
		 		let newStart = this.state.startingNumber + 1;
		 		this.setState({startingNumber: newStart})
		 	}
		 	this.props.onChangePage(nextGame);
		} else if (num === "one_back") {
			let prevGame = Number(this.props.activeGame);
			let bottomNumber = this.state.startingNumber;
			
			if(prevGame > 0) {
				this.props.onChangePage(prevGame)
				if(prevGame < bottomNumber) {
					let newStart = this.state.startingNumber - 1;
			 		this.setState({startingNumber: newStart})
				}
			} 
		} else if(num === "fiveForward"){
			let plusFive = this.state.startingNumber + 5;
			console.log(plusFive+" versus "+ max)
			if(plusFive < max) {
				this.props.onChangePage(plusFive)
				this.setState({startingNumber: plusFive});
			}

		} else if(num === "fiveBack"){
			let minusFive = this.state.startingNumber - 1;
			console.log(minusFive)
			if(this.state.startingNumber > 1) {
				this.props.onChangePage(minusFive)
				this.setState({startingNumber: minusFive});
			}

		} else {
			this.props.onChangePage(num)
		}
		
	}

	render () {
		let buttons = [],
		    i,
		    nextNum;


		buttons.push(
			<span
				key="-1"
				onClick = {() => this.handleChange("one_back")}   
				onMouseEnter={(e) => this.changeText(e)}
				onMouseLeave={(e) => this.emptyText(e)}
			>&lt;</span>
			)

		for(i = 0; i < 5; i++){
			let num = this.state.startingNumber + i;
			let pageNum = (num <= this.state.array.length)?num:this.state.blankText;
			let indexNumber = num - 1;
			let classes = (this.props.activeGame.toString() === indexNumber.toString())?`activeSpan`:``;
			buttons.push(
				<span
					key={i}
					className={classes}
					onClick = {() => this.handleChange(pageNum)} 
					onMouseEnter={(e) => this.changeText(e)}
					onMouseLeave={(e) => this.emptyText(e)}
				>{pageNum}</span>
			)
			nextNum = num;
		}

		
		buttons.push(
			<span
				key="100"
				onClick = {() => this.handleChange("one_forward")}  
				onMouseEnter={(e) => this.changeText(e)}
				onMouseLeave={(e) => this.emptyText(e)}
			>&gt;</span>
			)


		return (
			<div className="gamePagination">
				<h2>{this.state.array[this.props.activeGame].title}</h2>
				<div className="paginationText">{this.state.paginationText}</div>
				<div className="pagination">
					<span 
						className="fiveBack"
						onClick = {() => this.handleChange("fiveBack")}  
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
					>&lt;&lt;</span>
					{buttons}
					<span
						className="fiveForward"
						onClick = {() => this.handleChange("fiveForward")}  
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
					>&gt;&gt;</span>
				</div>
			</div>

			)
	}

}