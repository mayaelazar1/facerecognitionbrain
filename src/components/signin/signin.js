import {React, Component} from 'react';

class Signin extends Component {
	constructor(props) {
		super(props);
		// this.props = props;
		this.state = {
			signinEmail:'',
			signinPassword:''
		}
	}

    handleKeypress = e => {
        //it triggers by pressing the enter key
    	if (e.charCode === 13) {
    		this.btn.click();
    	}
    };


	onEmailChange = (event) => {
		this.setState({signinEmail: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({signinPassword: event.target.value});
	}
	onSubmitSignin = () => {
		fetch("http://localhost:3000/signin",{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signinEmail,
				password: this.state.signinPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.id) {
				this.props.loadUser(data);
				this.props.onRouteChange('home')
			} else {
				alert("Incorrect Submition")
			}
		})
	}

	render () {
		const {onRouteChange} = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address"
					        onChange={this.onEmailChange} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password"
					        onKeyPress={this.handleKeypress}
					        onChange={this.onPasswordChange}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      onClick={this.onSubmitSignin} 
					      type="submit" 
					      ref={node => (this.btn = node)}
					      value="Sign in"/>
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>
			)
			}

}

export default Signin