import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import logo from './logo.svg'


const Logo = () => {
	return ( 
			<div className='ma4 mt0'>
				<Tilt className="Tilt br2 shadow-2" options={{max: 55}} style={{width:120 , height:120}}>
					<div>
					<img className='photo' style={{paddingTop:'20px', paddingBottom: '20px'}} alt='logo' src={logo}/>
					</div>
				</Tilt>
			</div>
		)
}

export default Logo;