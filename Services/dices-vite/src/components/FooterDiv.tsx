import '../styles.css'
import React from 'react';


export default class FooterDiv extends React.Component{
  
	constructor(props: React.PropsWithChildren) {
		super(props);	
	}
	
	//ToDo - Version 2  - Add Links Footer And Sections
	
	render(){
		return (
			<footer>
				<div className="footerLink">
					<span className="icon icon-footer icon-home" ></span>
					Home
				</div>
				<div className="footerLink">
					<span className="icon icon-footer icon-info" ></span>
					About Us
				</div>
				<div className="footerLink">
					<span className="icon icon-footer icon-contact" ></span>
					Contact
				</div>
				<div className="footerLink">
					<span className="icon icon-footer icon-legal" ></span>
					Legal
				</div>
			
			</footer>
		)
	}
}
