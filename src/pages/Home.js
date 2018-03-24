import React from 'react';
import './Home.css';
import HomeCanvas from '../components/HomeCanvas';
import Logo from '../svgs/Logo';
import {connect} from 'react-redux';
//import { addItem } from '../actions/index.js';

class Home extends React.Component {
	// constructor(props){
	// 	super(props);
	// }
	// addItemHandler(){
	// 	this.props.dispatch(addItem(5))
	// }
	render () {
		return (
			<div className='homePage'>
			<HomeCanvas />
			<div className="textCont">
			<p>Hello!</p>
            <p>Lorem ipsum dolor dsit amet, consectetur adipiscing elit. Maecenas efficitur tellus velit, sit amet mollis felis porttitor nec. Aenean lorem turpis, tempus vitae ullamcorper quis, feugiat at magna. Donec leo quam, facilisis varius lacinia at, viverra ac enim. Proin tempor, lacus et molestie tincidunt, urna elit accumsan nisi, ac malesuada arcu leo ut velit.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur tellus velit, sit amet mollis felis porttitor nec. Aenean lorem turpis, tempus vitae ullamcorper quis, feugiat at magna. Donec leo quam, facilisis varius lacinia at, viverra ac enim. Proin tempor, lacus et molestie tincidunt, urna elit accumsan nisi, ac malesuada arcu leo ut velit.</p>
		      <Logo w="250" rotate="rotate(15)" color={true} />
		     </div>
	      </div>
	    );
	}
    
}

export const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps)(Home);