import '../styles.css'
import React from 'react';

import * as Functions from '../dices.tsx';

import {MyContext, MyContextType} from '../contextSrc/MyContext.tsx'

interface IProps {
	props?: any;
}

interface IState {
  jsonData?: any[];
  dataItems?: any[];
}

export default class Logout extends React.Component<IProps, IState>{
  
	constructor(props: any) {
		super(props);

		this.state = {
			jsonData: [],
			dataItems: []
		};
		this.logOutFunction = this.logOutFunction.bind(this);
		this.hideLoginFunction = this.hideLoginFunction.bind(this);
		this.hideRegisterPlayerFunction = this.hideRegisterPlayerFunction.bind(this);
		this.hideRegisterAdminFunction = this.hideRegisterAdminFunction.bind(this);

	}
		
	static contextType = MyContext;
	declare context: MyContextType;
	
	changeNavSectionAndUser = (userID: string, mainType: string) => {
		this.context.updateValueMainAndUserID(userID, mainType);
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
	
	updateLogoutVisibility = (newVisibility:string) => {
		this.context.updateLogoutVisibilitySetter(newVisibility);
	}


	logOutFunction(){
		console.log('logOutFunctionStart');
		Functions.setCookie('token','',1);
		Functions.setCookie('userid','',1);
		this.context.updateValueUserTypeAndMain('None', 'Login');
		console.log('logOutFunctionEnded');
		this.hideLoginFunction();
		this.hideRegisterPlayerFunction();
		this.hideRegisterAdminFunction();
		this.updateLogoutVisibility('none');
	}
  
	render(){
		return (
			<div className="LogOutDiv" onClick={this.logOutFunction} style={{display:  this.context.logoutVisibity }}>
			Log Out
			</div>
		)
	}
}

