import React from 'react';

function Navigation({isSignedIn, onRouteChange}) {
	if (isSignedIn) {
		return (
			<nav style={{display:'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signout')} className='f3 link black dim pr3 underline pointer'>Sign Out</p>
			</nav>
			)
	} else {
		return (
			<nav style={{display:'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f3 link black dim pr3 underline pointer'>Sign In</p>
				<p onClick={() => onRouteChange('register')} className='f3 link black dim pr3 underline pointer'>Register</p>
			</nav>
			);
		}
	}



export default Navigation;