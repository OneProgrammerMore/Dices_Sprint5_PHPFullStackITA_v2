import '../styles.css'
import React from 'react';

import NavEmpty from './NavEmpty.tsx';
import NavPlayer from './NavPlayer.tsx';
import NavAdmin from './NavAdmin.tsx';


import {MyContext, MyContextType, DisplayMenuNavContext} from '../contextSrc/MyContext.tsx';

interface IProps {
	props?: any;
}

interface IState {
	jsonData?: any[];
	dataItems?: any[];
}

export default class NavigatorDiv extends React.Component<IProps, IState>{
  
	constructor(props: any) {
		super(props);	
	}
	
	static contextType = MyContext;
	declare context: MyContextType;
	
	render(){
	  
		return (
			<MyContext.Consumer>
				{context  =>
					{
						if(!context){
							return null;
						}
						switch(context.userTypeSwitch){
							case 'None':
								return <NavEmpty />;
							case 'Player':
								return (
									<DisplayMenuNavContext.Consumer>									
										{ displayMenuNavContext => (
											<NavPlayer displayMenuContext={displayMenuNavContext}/>
										)}
									</DisplayMenuNavContext.Consumer>
								);
							case 'Admin':
								return (
									<DisplayMenuNavContext.Consumer>									
										{ displayMenuNavContext => (
											<NavAdmin  displayMenuContext={displayMenuNavContext}/>
										)}
									</DisplayMenuNavContext.Consumer>
								);
							default:
								return <NavEmpty />;
						
						}
					}
				}
			</MyContext.Consumer>
		);
	}
}
