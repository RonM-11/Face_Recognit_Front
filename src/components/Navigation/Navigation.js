import React from 'react';

const Navigation = ({onRouteChange, isSignin}) => {
	if(isSignin){
		return(
			<nav style={{display: 'flex', justifyContent:'flex-end' }}>
				<p className='f3 link dim black underline pa3 pointer' onClick = {() => onRouteChange('signin')}>Sign out</p> 
			</nav>
		);
	} else {
		return(
			<nav style={{display: 'flex', justifyContent:'flex-end' }}>
				<p className='f3 link dim black underline pa3 pointer' onClick = {() => onRouteChange('signin')}>Sign in</p>
				<p className='f3 link dim black underline pa3 pointer' onClick = {() => onRouteChange('register')}>Register</p> 
			</nav>
		)
	}
}

export default Navigation;