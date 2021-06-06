import {React, Component} from 'react';

class Register extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}

	handleKeypress = e => {
        //it triggers by pressing the enter key
    	if (e.charCode === 13) {
    		this.btn.click();
    	}
    };

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}
	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}
	onSubmitSignin = () => {
		fetch("http://localhost:3000/register", {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(
				this.state
				)
		})
		.then(data => data.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home')
				} else {
					alert("Incorrect Submittion")
				}
			});
	}


	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
					      <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				          <input 
				          onChange={this.onNameChange}
				          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				          type="text" 
				          name="name"  
				          id="name"/>
				      </div>
				      <div className="mt3">
				          <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				          <input 
				          onChange ={this.onEmailChange}
				          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				          type="email" 
				          name="email-address"  
				          id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">New Password</label>
				        <input 
				        onChange={this.onPasswordChange}
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password"
				        onKeyPress={this.handleKeypress}
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      onClick={this.onSubmitSignin} 
				      ref={node => (this.btn = node)}
				      type="submit" 
				      value="Register"/>
				    </div>
				  </div>
				</main>
			</article>
			)
		}
	}

export default Register