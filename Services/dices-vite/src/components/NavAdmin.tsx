import '../styles.css'
import React from 'react';

import {MyContext, MyContextType, DisplayMenuNavContextInterface} from '../contextSrc/MyContext.tsx';
import NavIcon from './NavIcon.tsx';

interface IProps {
	props?: React.PropsWithChildren;
	displayMenuContext: DisplayMenuNavContextInterface;
}
interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

//import {ShowListPlayers, ShowRanking, ShowLoser, ShowWinner} from '../main.tsx';

export default class NavEmpty extends React.Component<IProps, IState>{
  
	constructor(props: IProps) {
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
	
	render(){
		return (
			<div id="AdminNav" className={"navSection " + this.props.displayMenuContext.displayMenu}>
				<div className="navName">
					- Admin - 
				</div>
				
				<div className="navItems" >
					<div className="navItem">
						<a href="#" onClick={() => this.changeNavSection('ListPlayers')} >
							<span className="icon icon-nav icon-list" ></span>
							List Players
						</a>
					</div>
					<div className="navItem">
						<a href="#" onClick={() => this.changeNavSection('Ranking')} >
							<span className="icon icon-nav icon-cup" ></span>
							Ranking
						</a>
					</div>
					<div className="navItem">
						<a href="#" onClick={() => this.changeNavSection('Loser')} >
							<span className="icon icon-nav icon-worst" ></span>
							Worst
						</a>
					</div>
					<div className="navItem">
						<a href="#" onClick={() => this.changeNavSection('Winner')} >
							<span className="icon icon-nav icon-top" ></span>
							Best
						</a>
					</div>
				</div>
				<NavIcon/>
			</div>
		)
	}
}
