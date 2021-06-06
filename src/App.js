import {React, Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import FaceRecognision from './components/FaceRecognision/FaceRecognision.js'
import Signin from './components/signin/signin.js'
import Register from './components/Register/Register.js'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
	apiKey: '2fe74c60576d44af92647178770591d5'
});

const initialState = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				password: '',
				entries: 0,
				joined: ''
			}   
		};

class App extends Component {
	constructor () {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}});
	}

	getBoundingBox = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width ,
			rightCol: width - (clarifaiFace.right_col * width),
			topRow: clarifaiFace.top_row * height,
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState)
		} else if (route === 'home'){
			this.setState({isSignedIn: true})
		}
		this.setState({route: route}) 
	}

	displayBox = (box) => {
		this.setState({box: box});
	}

	onChageInput = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict("a403429f2ddf4b49b307e318f00e528b",
			this.state.input)
			.then( response => {
					if (response){
						fetch("http://localhost:3000/image", {
							method: 'put',
							headers: {'Content-Type':'application/json'},
							body: JSON.stringify(
								{id : this.state.user.id})
						})
						.then(response => response.json())
						.then(count => this.setState(Object.assign(this.state.user,{entries: count})));
					}
					this.displayBox(
						this.getBoundingBox(response))})
			.catch(
				error => console.log(error));
		}

	
	componentDidMount () {
		fetch('http://localhost:3000/').then((res) => res.json());
	}


	render() {
		const {isSignedIn,box, imageUrl, route} = this.state;
	  	return (
		    <div className="App">
		    	<Particles className='particles'/>
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
				{this.state.route === 'home' ?
					<div>
						<Logo/>
						<Rank 
							name={this.state.user.name}
							entries={this.state.user.entries}/>
						<ImageLinkForm 
							onInputChange={this.onChageInput} 
							onButtonSubmit={this.onButtonSubmit}/>
						<FaceRecognision box={box} imageUrl={imageUrl} />
					</div>
				: (route === 'signin' ?
		    			<Signin 
		    			onRouteChange={this.onRouteChange}
		    			loadUser={this.loadUser} />
		    	  : <Register 
		    	  onRouteChange = {this.onRouteChange}
		    	  loadUser = {this.loadUser}/> 
					  ) 
					}
		    </div>
	  	);
	}
}

export default App;




