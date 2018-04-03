import React from 'react';
import './GamePagination.css';
export default class GamePagination extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			paginationText: '',
			currentPage: window.location.pathname
		}
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
		}		
		this.setState({
			paginationText: response
		})
	}
	emptyText (e) {
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
		}		
		this.setState({
			paginationText: ''
		})
	}
	changeAnim (e) {
		
	}

	render () {
		return (
			<div className="gamePagination">
				<div className="paginationText">{this.state.paginationText}</div>
				<div className="pagination">
					<span 
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
					>&lt;&lt;</span>
					<span 
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
					>&lt;</span>
					<span className="activeSpan" onClick={(e) => this.changeAnim(e)}>1</span>
					<span onClick={(e) => this.changeAnim(e)}>2</span>
					<span onClick={(e) => this.changeAnim(e)}>3</span>
					<span onClick={(e) => this.changeAnim(e)}>4</span>
					<span 
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
					>&gt;</span>
					<span 
						onMouseEnter={(e) => this.changeText(e)}
						onMouseLeave={(e) => this.emptyText(e)}
					>&gt;&gt;</span>
				</div>
			</div>

			)
	}

}