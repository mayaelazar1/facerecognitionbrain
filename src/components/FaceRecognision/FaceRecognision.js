import React from 'react';
import './FaceRecognision.css'

const FaceRecognision = ({box,imageUrl}) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
				<div className='boundingBox' style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
			</div>
		</div>
		)
	
}

export default FaceRecognision;