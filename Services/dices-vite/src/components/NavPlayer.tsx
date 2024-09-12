import '../styles.css'
import React from 'react';

import * as Functions from '../dices.tsx';

import {MyContext, MyContextType, DisplayMenuNavContextInterface} from '../contextSrc/MyContext.tsx';
import NavIcon from './NavIcon.tsx';

interface IProps {
	props?: any;
	displayMenuContext: DisplayMenuNavContextInterface;
}

interface IState {
  jsonData?: any[];
  dataItems?: any[];
}


export default class NavPlayer extends React.Component<IProps, IState>{

	constructor(props: any) {
		super(props);	
	}
	


	static contextType = MyContext;
	declare context: MyContextType;
	
	changeNavSection = (newType: string) => {
		this.context.updateValueMain(newType);
		this.props.displayMenuContext.setDisplayMenuCloseButton('hiddenClass');
		this.props.displayMenuContext.setDisplayMenuOpenButton('visibleClass');
		this.props.displayMenuContext.setDisplayMenu('navClosed');

	}
	
	changeNavSectionAndUser = (userID: string, mainType: string) => {
		this.context.updateValueMainAndUserID(userID, mainType);
		this.props.displayMenuContext.setDisplayMenuCloseButton('hiddenClass');
		this.props.displayMenuContext.setDisplayMenuOpenButton('visibleClass');
		this.props.displayMenuContext.setDisplayMenu('navClosed');
	}

	render(){
		return (
			<div id="UserNav" className={"navSection " + this.props.displayMenuContext.displayMenu} /*className="navSection "*/ /*className={"navSection " + this.context.displayMenu}*/ >
				
				<div className="navName">
					User
				</div>
				
				<div className="navItems">
					<div className="navItem">
						<a href="#" onClick={() => this.changeNavSection('Play')}>
							Play
						</a>
					</div>
					<div className="navItem">
						<a href="#" onClick={() => this.changeNavSection('Delete')}>
							Delete
						</a>
					</div>
					<div className="navItem">
						<a href="#" onClick={() => this.changeNavSection('ModifyName')} >
							Modify Name
						</a>
					</div>
					<div className="navItem">
						<a href="#" onClick={() => this.changeNavSectionAndUser(Functions.getCookie('userid'),'Player')} >
							Show Player
						</a>
					</div>
				</div>
				
				<NavIcon/>
			</div>
			
		)
	}
}
