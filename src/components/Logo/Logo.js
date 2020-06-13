import React from 'react';
import Tilt from 'react-tilt'
import logo from './logo.png'
import './Logo.css';


const Logo = () => {
	return (
		<div className = 'ma4 mt0'>
			<Tilt className="Tilt br2 shadow-1" options={{ max : 50, transition: true }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa3"> 
 					<img alt = 'brain-logo'  src = {logo} />
 				</div>
			</Tilt>
		</div>

	);
}

export default Logo;