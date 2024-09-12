import '../styles.css'
import React from 'react';

import * as Constants from '../constants.tsx';
import * as Functions from '../dices.tsx';
import * as Yup from 'yup';

import {MyContext, MyContextType} from '../contextSrc/MyContext.tsx'



interface IProps {
	props?: any;
}

interface IState {
  jsonData?: any[];
  dataItems?: any[];
  error: any;
  registerPlayerError: any;
  registerAdminError: any;
}

export default class Login extends React.Component<IProps, IState>{
	
	constructor(props: any) {
		super(props);

		this.handleSubmitRegisterPlayer = this.handleSubmitRegisterPlayer.bind(this);
		this.registerPlayer = this.registerPlayer.bind(this);

		this.handleSubmitRegisterAdmin = this.handleSubmitRegisterAdmin.bind(this);
		this.registerAdmin = this.registerAdmin.bind(this);

		this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
		this.login = this.login.bind(this);


		this.displayLoginFunction = this.displayLoginFunction.bind(this);
		this.displayRegisterPlayerFunction = this.displayRegisterPlayerFunction.bind(this);
		this.displayRegisterAdminFunction = this.displayRegisterAdminFunction.bind(this);

		this.hideLoginFunction = this.hideLoginFunction.bind(this);
		this.hideRegisterPlayerFunction = this.hideRegisterPlayerFunction.bind(this);
		this.hideRegisterAdminFunction = this.hideRegisterAdminFunction.bind(this);

		this.updateLogoutVisibility = this.updateLogoutVisibility.bind(this);

		this.state = {
			jsonData: [],
			dataItems: [],
			error: [],
			registerPlayerError: [],
			registerAdminError: []
		};

	}

	submittedLogin:boolean = false;
	submittedRegisterPlayer:boolean = false;
	submittedRegisterAdmin:boolean = false;
	
	userSchema:Yup.AnyObject = Yup.object().shape({
		email: Yup.string().required("Email is required").email("Invalid email format"),
		password: Yup.string().min(4, "Password must be at least 4 characters long").required("Password is required")
	});

	handleFormLogin = async(e:any) => {
		this.submittedLogin = true;
		e.preventDefault()
		let form = e.target;
		let formData = new FormData(form)
		let formObj = Object.fromEntries(formData.entries())
		var errorsInfo: any = {};
		var arrayAux:string[] = [];

		try {
			let validForm = await this.userSchema.isValid(formObj)
			if(validForm) {
				this.handleSubmitLogin(e);

			}else{
				let validationError = await this.userSchema.validate(formObj, { strict:true, abortEarly: false });
				validationError.inner.forEach((error: any, i:number) => {
					if (error.path !== undefined) {
						if(Array.isArray(errorsInfo[error.path]) == false){
							arrayAux = [];
							errorsInfo[error.path] = arrayAux;
						}
						if(errorsInfo[error.path]){
							errorsInfo[error.path].push(validationError.errors[i]);
						}
					}
				});
				this.setState({
					error: errorsInfo
				});
			}

		}
		catch(err:any) {
			
			err.inner.forEach((error: any, i:number) => {
				if (error.path !== undefined) {
					if(Array.isArray(errorsInfo[error.path]) == false){
						arrayAux = [];
						errorsInfo[error.path] = arrayAux;
					}
					if(errorsInfo[error.path]){
						errorsInfo[error.path].push(err.errors[i]);
					}
				}
			});
			this.setState({
				error: errorsInfo
			});
		}
	}

	validateLogin = async() => {
		if(this.submittedLogin == false) return;
		const form: HTMLFormElement =  document.getElementById("login_form") as HTMLFormElement;
		let formData = new FormData(form)
		let formObj = Object.fromEntries(formData.entries())
		var errorsInfo: any = {};
		var arrayAux:string[] = [];

		try {
			let validForm = await this.userSchema.isValid(formObj)
			if(validForm) {
				this.setState({
					error: {}
				});
			}else{
				let validationError = await this.userSchema.validate(formObj, { strict:true, abortEarly: false });
				validationError.inner.forEach((error: any, i:number) => {
					if (error.path !== undefined) {
						if(Array.isArray(errorsInfo[error.path]) == false){
							arrayAux = [];
							errorsInfo[error.path] = arrayAux;
						}
						if(errorsInfo[error.path]){
							errorsInfo[error.path].push(validationError.errors[i]);
						}
					}
				});
				this.setState({
					error: errorsInfo
				});
			}

		}
		catch(err:any) {
			
			err.inner.forEach((error: any, i:number) => {
				if (error.path !== undefined) {
					if(Array.isArray(errorsInfo[error.path]) == false){
						arrayAux = [];
						errorsInfo[error.path] = arrayAux;
					}
					if(errorsInfo[error.path]){
						errorsInfo[error.path].push(err.errors[i]);
					}
				}
			});
			this.setState({
				error: errorsInfo
			});
		}
	}

	validateRegisterPlayer = async() => {
		if(this.submittedRegisterPlayer == false) return;
		const form: HTMLFormElement =  document.getElementById("register_player_form") as HTMLFormElement;
		let formData = new FormData(form)
		let formObj = Object.fromEntries(formData.entries())
		var errorsInfo: any = {};
		var arrayAux:string[] = [];

		try {
			let validForm = await this.registerSchema.isValid(formObj)
			if(validForm) {
				this.setState({
					error: {}
				});
			}else{
				let validationError = await this.registerSchema.validate(formObj, { strict:true, abortEarly: false });
				validationError.inner.forEach((error: any, i:number) => {
					if (error.path !== undefined) {
						if(Array.isArray(errorsInfo[error.path]) == false){
							arrayAux = [];
							errorsInfo[error.path] = arrayAux;
						}
						if(errorsInfo[error.path]){
							errorsInfo[error.path].push(validationError.errors[i]);
						}
					}
				});
				this.setState({
					registerPlayerError: errorsInfo
				});
			}
		}
		catch(err:any) {
			
			err.inner.forEach((error: any, i:number) => {
				if (error.path !== undefined) {
					if(Array.isArray(errorsInfo[error.path]) == false){
						arrayAux = [];
						errorsInfo[error.path] = arrayAux;
					}
					if(errorsInfo[error.path]){
						errorsInfo[error.path].push(err.errors[i]);
					}
				}
			});
			this.setState({
				registerPlayerError: errorsInfo
			});
		}
	}

	validateRegisterAdmin = async() => {
		if(this.submittedRegisterAdmin == false) return;
		const form: HTMLFormElement =  document.getElementById("register_admin_form") as HTMLFormElement;
		let formData = new FormData(form)
		let formObj = Object.fromEntries(formData.entries())
		var errorsInfo: any = {};
		var arrayAux:string[] = [];

		try {
			let validForm = await this.registerSchema.isValid(formObj)
			if(validForm) {
				this.setState({
					error: {}
				});
			}else{
				let validationError = await this.registerSchema.validate(formObj, { strict:true, abortEarly: false });
				validationError.inner.forEach((error: any, i:number) => {
					if (error.path !== undefined) {
						if(Array.isArray(errorsInfo[error.path]) == false){
							arrayAux = [];
							errorsInfo[error.path] = arrayAux;
						}
						if(errorsInfo[error.path]){
							errorsInfo[error.path].push(validationError.errors[i]);
						}
					}
				});
				this.setState({
					registerAdminError: errorsInfo
				});
			}

		}
		catch(err:any) {
			
			err.inner.forEach((error: any, i:number) => {
				if (error.path !== undefined) {
					if(Array.isArray(errorsInfo[error.path]) == false){
						arrayAux = [];
						errorsInfo[error.path] = arrayAux;
					}
					if(errorsInfo[error.path]){
						errorsInfo[error.path].push(err.errors[i]);
					}
				}
			});
			this.setState({
				registerAdminError: errorsInfo
			});
		}
	}

	registerSchema:Yup.AnyObject = Yup.object().shape({
		name: Yup.string(),
		email: Yup.string().required("Email is required").email("Invalid email format"),
		password: Yup.string().min(4, "Password must be at least 4 characters long").required("Password is required"),
		password_confirmation: Yup.string().test('passwords-match', 'Passwords must match', function(value){
			return this.parent.password === value
		  })
	});

	handlePlayerRegister = async(e:any) => {
		this.submittedRegisterPlayer = true;
		e.preventDefault()
		let form = e.target;
		let formData = new FormData(form)
		let formObj = Object.fromEntries(formData.entries())
		var errorsInfo: any = {};
		var arrayAux:string[] = [];

		try {
			let validForm = await this.registerSchema.isValid(formObj)
			if(validForm) {
				this.handleSubmitRegisterPlayer(e);
			}else{
				let validationError = await this.registerSchema.validate(formObj, { strict:true, abortEarly: false });
				validationError.inner.forEach((error: any, i:number) => {
					if (error.path !== undefined) {
						if(Array.isArray(errorsInfo[error.path]) == false){
							arrayAux = [];
							errorsInfo[error.path] = arrayAux;
						}
						if(errorsInfo[error.path]){
							errorsInfo[error.path].push(validationError.errors[i]);
						}
					}
				});
				this.setState({
					registerPlayerError: errorsInfo
				});
			}
		}
		catch(err:any) {
			
			err.inner.forEach((error: any, i:number) => {
				if (error.path !== undefined) {
					if(Array.isArray(errorsInfo[error.path]) == false){
						arrayAux = [];
						errorsInfo[error.path] = arrayAux;
					}
					if(errorsInfo[error.path]){
						errorsInfo[error.path].push(err.errors[i]);
					}
				}
			});
			this.setState({
				registerPlayerError: errorsInfo
			});
		}
	}

	handleAdminRegister = async(e:any) => {
		this.submittedRegisterAdmin = true;
		e.preventDefault()
		let form = e.target;
		let formData = new FormData(form)
		let formObj = Object.fromEntries(formData.entries())
		var errorsInfo: any = {};
		var arrayAux:string[] = [];

		try {
			let validForm = await this.registerSchema.isValid(formObj)
			if(validForm) {
				this.handleSubmitRegisterAdmin(e);
			}else{
				let validationError = await this.registerSchema.validate(formObj, { strict:true, abortEarly: false });
				validationError.inner.forEach((error: any, i:number) => {
					if (error.path !== undefined) {
						if(Array.isArray(errorsInfo[error.path]) == false){
							arrayAux = [];
							errorsInfo[error.path] = arrayAux;
						}
						if(errorsInfo[error.path]){
							errorsInfo[error.path].push(validationError.errors[i]);
						}
					}
				});
				this.setState({
					registerAdminError: errorsInfo
				});
			}
		}
		catch(err:any) {
			
			err.inner.forEach((error: any, i:number) => {
				if (error.path !== undefined) {
					if(Array.isArray(errorsInfo[error.path]) == false){
						arrayAux = [];
						errorsInfo[error.path] = arrayAux;
					}
					if(errorsInfo[error.path]){
						errorsInfo[error.path].push(err.errors[i]);
					}
				}
			});
			this.setState({
				registerAdminError: errorsInfo
			});
		}
	}

	static contextType = MyContext;
	declare context: MyContextType;
	
	chengeUserType = (newType: string) => {
		this.context.updateValue(newType);
	}
	changeNavSection = (newType: string) => {
		this.context.updateValueMain(newType);
	}
	handleSubmitRegisterPlayer(event: any) {
		event.preventDefault();
		this.registerPlayer(event);
	}
	

	displayLoginFunction(){
		this.context.updateLoginFormDisplayStyle('flex');
	}
	displayRegisterPlayerFunction(){
		this.context.updateRegisterPlayerFormDisplayStyle('flex');
	}
	displayRegisterAdminFunction(){
		this.context.updateRegisterAdminFormDisplayStyle('flex');
	}
	hideLoginFunction(){
		this.context.updateLoginFormDisplayStyle('none');
	}
	hideRegisterPlayerFunction(){
		this.context.updateRegisterPlayerFormDisplayStyle('none');
	}
	hideRegisterAdminFunction(){
		this.context.updateRegisterAdminFormDisplayStyle('none');
	}

	logoutVisibilitySet:string = 'flex';
	updateLogoutVisibility = (newVisibility:string) => {
		this.context.updateLogoutVisibilitySetter(newVisibility);
	}

	
	async registerPlayerApiCall(event: any){
		
		var registerPlayerURI:string = '/api/register';
		var registerPlayerEndPoint:string = Constants.dices_URL + registerPlayerURI;
		
		var name:string = event.target.name.value;
		var email:string = event.target.email.value;
		var password:string = event.target.password.value;
		var password_confirmation:string = event.target.password_confirmation.value;
		
		const response = await fetch( registerPlayerEndPoint, {
			method: 'POST',
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
				password_confirmation: password_confirmation
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		
		return response;
	}
	
	
	async registerPlayer(event: any){
	
		
		let response  = await this.registerPlayerApiCall(event);
		if(response.ok){


			const result = await response.json();
			var jsonResponseBody = result;

			Functions.setCookie('token', jsonResponseBody['jwtoken'], 90); 
			Functions.setCookie('userid', jsonResponseBody['user_id'], 90); 
			Functions.setCookie('userName', jsonResponseBody['name'], 90); 
			Functions.setCookie('userRole', jsonResponseBody['role'], 90); 
			
			this.updateLogoutVisibility(this.logoutVisibilitySet);
			this.setPlayer();
			
		}else{
			alert('There was an error processing your registration. Either the name or the email are taken, or the passwords are not the same');
		}
	}
  
  
	handleSubmitRegisterAdmin(event: any) {
		event.preventDefault();
		this.registerAdmin(event);
	}
	
	async registerAdminApiCall(event: any){

		var registerAdminURI:string = '/api/registeradmin';
		var registerAdminEndPoint:string = Constants.dices_URL + registerAdminURI;

		var name:string = event.target.name.value;
		var email:string = event.target.email.value;
		var password:string = event.target.password.value;
		var password_confirmation:string = event.target.password_confirmation.value;

		
		const response = await fetch( registerAdminEndPoint, {
			method: 'POST',
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
				password_confirmation: password_confirmation
			}),
			headers: {
				'Content-Type': 'application/json'
			}
			
		});
		
		return response;	
	}
	
	printValidationErrorsByKey(errors:any){
		
		var output = document.createDocumentFragment();
		if(Array.isArray(errors)){
			errors.forEach((element:string) => {
				var e = document.createElement('div');
				e.innerHTML = element;
				output.appendChild(e);
			}
			);
		}
		
		return output;
	}
	
  
	async registerAdmin(event: any){
	
		let response =  await this.registerAdminApiCall(event);
		
		if(response.ok){
			const result = await response.json();
			var jsonResponseBody = result;
			
			Functions.setCookie('token', jsonResponseBody['jwtoken'], 90); 
			Functions.setCookie('userid', jsonResponseBody['user_id'], 90); 
			Functions.setCookie('userName', jsonResponseBody['name'], 90); 
			Functions.setCookie('userRole', jsonResponseBody['role'], 90); 
			
			this.setAdmin();
			this.updateLogoutVisibility(this.logoutVisibilitySet);
		}else{
			alert('There was an error processing your registration. Either the name or the email are taken, or the passwords are not the same');
		}
	}
	
	handleSubmitLogin(event: any) {
		event.preventDefault();
		this.login(event);
	}
	
	async loginApiCall(event: any){
			
		var loginURI:string = '/api/login';
		var loginEndPoint:string = Constants.dices_URL + loginURI;
		
		var email:string = event.target.email.value;
		var password:string = event.target.password.value;

		const response = await fetch( loginEndPoint, {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
			
		});
		
		return response;
		
		
	}
	
	async queryOnlyAdmin(){
		var token = Functions.getCookie('token');
		var listPlayersURI:string = '/api/players';
		var listPlayersEndPoint:string = Constants.dices_URL + listPlayersURI;
		
		const response = await fetch( listPlayersEndPoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
			
		});
		return response;
	}

	async queryPlayerAndAdmin(){
		var token = Functions.getCookie('token');
		var playerid = Functions.getCookie('userid');

		var playerIDCookie = playerid;
		var playerURI:string = '/api/players/'+playerIDCookie+'/games';
		var playerEndPoint:string = Constants.dices_URL + playerURI;
		
		const response = await fetch( playerEndPoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
		});
		return response;
	}
	
	async getRolesWorkAround(){
		let response = await this.queryOnlyAdmin();
		var role = null;
		if(response.ok){
			role = 'Admin';
		}else{
			role = 'Player';
		}
		return role;
	}
	
	setAdmin(){
		this.chengeUserType('Admin');
		this.changeNavSection('Home');
		this.updateLogoutVisibility(this.logoutVisibilitySet);
	}
	
	setPlayer(){
		this.chengeUserType('Player');
		this.changeNavSection('Home');
		this.updateLogoutVisibility(this.logoutVisibilitySet);
	}
	
	
	async login(event: any){

		let response = await this.loginApiCall(event);
		
		if(response.ok){
			const jsonResponseBody = await response.json();

			Functions.setCookie('token', jsonResponseBody['jwtoken'], 90); 
			Functions.setCookie('userid', jsonResponseBody['user_id'], 90); 
			Functions.setCookie('userName', jsonResponseBody['name'], 90); 
			Functions.setCookie('userRole', jsonResponseBody['role'], 90); 
			
			let role = jsonResponseBody['role'];

			switch(role){
				case 'admin':
					this.setAdmin();
					break;
				case 'player':
					this.setPlayer();
					break;
				default:
					break;
			}
			this.updateLogoutVisibility(this.logoutVisibilitySet);
		}else{
			alert('There was an error processing your Login. Either the name or the email are wrong.');
		}
	}
	
	//Check if user is already Logged In (Cookies Exists) and Set page:
	async componentDidMount(){
		//Check cookie token and userid
		var userID = Functions.getCookie('userid');
		var token = Functions.getCookie('token');
		var role = Functions.getCookie('userRole');
		
		if(userID != '' && token != ''){
			if(role == 'admin'){
				this.setAdmin();
			}else if(role == 'player'){
				var response = await this.queryPlayerAndAdmin();
				if(response.ok){
					this.setPlayer();
				}
			}
		}
	}
  
	render(){

		const contextValues = this.context;
		
		return (
			<div className="main_container">

				<div className="loginSelector">
					<div className="buttonLoginSelector" onClick={this.displayLoginFunction}>
						<i className="loginIcon"></i>
						Login
					</div>
					<div className="buttonLoginSelector" onClick={this.displayRegisterPlayerFunction}>
						<i className="registerPlayerIcon"></i>
						Register As Player
					</div>
					<div className="buttonLoginSelector" onClick={this.displayRegisterAdminFunction}>
						<i className="registerAdminIcon"></i>
						Register As Admin
					</div>

				</div>

				<div className="form_section" id="loginForm" style={{display:  contextValues.loginFormDisplayStyle }} >
					<div className="form_section-inner-login">

						<div className="closeRow" onClick={this.hideLoginFunction}>
							<i className="closeIcon"></i>
						</div>
						<h3>
							Login
						</h3>
						<form id="login_form" className="form_user" onSubmit={this.handleFormLogin} autoComplete="on"  noValidate onChange={this.validateLogin}   >
							
							<label htmlFor="login_form_email">
								Email
							</label>
							<input id="login_form_email" type="email" name="email" required autoComplete='on' />
							
							{ this.state.error.email && this.state.error['email'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3>{errorText}</h3></div>)} )}
							{ !this.state.error.email && <div className="errorMessageFormEmpty"><h3></h3></div>}
							<label htmlFor="login_form_password">
								Password
							</label>
							<input id="login_form_password" type="password" name="password" required />
							
							{ this.state.error.password && this.state.error['password'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3 >{errorText}</h3></div>)} )}
							{ !this.state.error.password && <div className="errorMessageFormEmpty"><h3></h3></div>}
							{ ( !this.state.error.password || this.state.error.password.length < 2) && <div className="errorMessageFormEmpty"><h3></h3></div>}

							
							<input type="submit"  className="submitBttn" value="Submit"/>
						
						</form>	

					</div>
					<div className='background-form'>

					</div>

							
				</div>
				
				
				<div className="form_section" id="registerPlayerForm" style={{display:  contextValues.registerPlayerFormDisplayStyle }} >
					<div className="form_section-inner">

						<div className="closeRow" onClick={this.hideRegisterPlayerFunction}>
							<i className="closeIcon"></i>
						</div>
						<h3>
							Register as Player
						</h3>
						<form id="register_player_form" className="form_user" onSubmit={this.handlePlayerRegister} autoComplete="on" noValidate onChange={this.validateRegisterPlayer} >
							<label htmlFor="register_player_form_name">
									Name
							</label>
							<input id="register_player_form_name" type="text" name="name" autoComplete='on' />
							{ this.state.registerPlayerError.name && this.state.registerPlayerError['name'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3 >{errorText}</h3></div>)} )}

							<label htmlFor="register_player_form_email">
								Email
							</label>
							<input id="register_player_form_email" type="email" name="email" required  autoComplete='on'/>
							{ this.state.registerPlayerError.email && this.state.registerPlayerError['email'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3 >{errorText}</h3></div>)} )}
							{ !this.state.registerPlayerError.email && <div className="errorMessageFormEmpty"><h3></h3></div>}

							<label htmlFor="register_player_form_password">
								Password
							</label>
							<input id="register_player_form_password" type="password" name="password" required />
							{ this.state.registerPlayerError.password && this.state.registerPlayerError['password'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3 >{errorText}</h3></div>)} )}
							{ !this.state.registerPlayerError.password && <div className="errorMessageFormEmpty"><h3></h3></div>}
							{ ( !this.state.registerPlayerError.password || this.state.registerPlayerError.password.length < 2) && <div className="errorMessageFormEmpty"><h3></h3></div>}

							<label htmlFor="register_player_form_password_confirmation">
								Password Confirmation
							</label>
							<input id="register_player_form_password_confirmation" type="password" name="password_confirmation" required/>
							{ this.state.registerPlayerError.password_confirmation && this.state.registerPlayerError['password_confirmation'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3 >{errorText}</h3></div>)} )}
							{ !this.state.registerPlayerError.password_confirmation && <div className="errorMessageFormEmpty"><h3></h3></div>}

							<input type="submit" className="submitBttn" value="Submit" />
						
						</form>	


					</div>
					<div className='background-form'>

					</div>
							
				</div>
				
				
				<div className="form_section" id="registerAdminForm"  style={{display:  contextValues.registerAdminFormDisplayStyle }} >

						<div className="form_section-inner">
					
							<div className="closeRow" onClick={this.hideRegisterAdminFunction}>
								<i className="closeIcon"></i>
							</div>
							<h3>
								Register as Administator
							</h3>
							<form id="register_admin_form" className="form_user" onSubmit={this.handleAdminRegister} autoComplete="on" noValidate onChange={this.validateRegisterAdmin} >
								
								<label htmlFor="register_admin_form_name">
									Name
								</label>
								<input id="register_admin_form_name" type="text" name="name" autoComplete='on' />
								{ this.state.registerAdminError.name && this.state.registerAdminError['name'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3 >{errorText}</h3></div>)} )}

								<label htmlFor="register_admin_form_email">
									Email
								</label>
								<input id="register_admin_form_email" type="email" name="email" required autoComplete='on' />
								{ this.state.registerAdminError.email && this.state.registerAdminError['email'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3 >{errorText}</h3></div>)} )}
								{ !this.state.registerAdminError.email && <div className="errorMessageFormEmpty"><h3></h3></div>}

								<label htmlFor="register_admin_form_password">
									Password
								</label>
								<input id="register_admin_form_password" type="password" name="password" required />
								{ this.state.registerAdminError.password && this.state.registerAdminError['password'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3 >{errorText}</h3></div>)} )}
								{ !this.state.registerAdminError.password && <div className="errorMessageFormEmpty"><h3></h3></div>}
								{ ( !this.state.registerAdminError.password || this.state.registerAdminError.password.length < 2) && <div className="errorMessageFormEmpty"><h3></h3></div>}

								<label htmlFor="register_admin_form_password_confirmation">
									Password Confirmation
								</label>
								<input className="inputForm" id="register_admin_form_password_confirmation" type="password" name="password_confirmation" required/>
								{ this.state.registerAdminError.password_confirmation && this.state.registerAdminError['password_confirmation'].map((errorText: string) => {return(<div key={errorText} className="errorMessageForm"><h3 >{errorText}</h3></div>)} )}
								{ !this.state.registerAdminError.password_confirmation  && <div className="errorMessageFormEmpty"><h3></h3></div>}
								<input type="submit"   className="submitBttn" value="Submit" />
							
							</form>			
						</div>

					
					<div className='background-form'>
					</div>
						
				</div>
			</div>
		)
	}
}

