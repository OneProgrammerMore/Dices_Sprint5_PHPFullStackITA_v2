import '../styles.css'
import React from 'react';

import * as Constants from '../constants.tsx';
import * as Functions from '../dices.tsx';
import {Commet} from 'react-loading-indicators';

import {MyContext, MyContextType} from '../contextSrc/MyContext.tsx'

interface IProps {
		props?: any;
}

interface IState {
  jsonData?: any[];
  dataItems?: any[];
  data: any,
  error: any,
  loading: boolean,
  dataFetched: boolean;
  dataExists: boolean;
}

export default class ListUsers extends React.Component<IProps, IState>{
  
	constructor(props: any) {
		super(props);
		this.state = {
			jsonData: [],
			dataItems: [],
			data: null,
			error: null,
			loading: true,
			dataFetched: false,
			dataExists: true,
		};
	}
	
	static contextType = MyContext;
	declare context: MyContextType;
	
	changeNavSectionAndUser = (userID: string, mainType: string) => {
		this.context.updateValueMainAndUserID(userID, mainType);
	}
	
	async listPlayersApiCall(){
		//Procedure
		//0. Prevent default submit
		//1. Take all parameters from the form
		//2. Validate the parameters from the form
		//3. Send the parameters to the API
		//4. Fetch response and act according it
			//Status 201 -> Store Token and reroute to Play
			//Status 401 -> Show error message		
		
		return new Promise((resolve) => {
			
			console.log("Status One");
			var token = Functions.getCookie('token');
			var listPlayersURI:string = '/api/players';
			var listPlayersEndPoint:string = Constants.dices_URL + listPlayersURI;
			var data;

			fetch( listPlayersEndPoint, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token,
				}
				
			}).then(
				function(response) {
					return response.json();
				}
			).then(
				function(json) {
					data = json;
					resolve(data);
				}
			).catch(
				() =>{
					this.setState({
						dataFetched: true,
						dataExists: false,
					});
				}
			);

			});



	}



	async componentDidMount(){
	
		var jsonDataPlayers:any = await this.listPlayersApiCall();
		console.log(jsonDataPlayers);

		var arr: any [] = [];
		
		Object.keys(jsonDataPlayers).forEach(key => arr.push({
			id: key, 
			name: jsonDataPlayers[key]['user_name'],
			tries: jsonDataPlayers[key]['user_tries'],
			wins: jsonDataPlayers[key]['user_wins'],
			wins_perc: jsonDataPlayers[key]['wins_perc']
			}));
		

		this.setState({
			dataItems: [
				arr.map(
				(player)=>{
					return(
						<tr key={player.id}>
							<td>
								{player.id}
							</td>
							<td>
								{player.name}
							</td>
							<td>
								{player.tries}
							</td>
							<td>
								{player.wins}
							</td>
							<td>
								{player.wins_perc.toFixed(3)}
							</td>
							<td>
								<div onClick={ () => this.changeNavSectionAndUser(player.id, 'Player') } > 
									<i className="moreInfoIcon"></i>
								</div>
							</td>
						</tr>
						)
					}
				
				)
				
			],
			dataFetched: true
		});

	}
  
	render(){
		if(this.state.dataFetched == false){
			return(	
				<div className="main_container">
					<Commet color="#32cd32" size="medium" text="" textColor="" />
				</div>
			);
		}else if(this.state.dataExists == true){
			return (
				<div className="main_container">
					<h3>
						List Players
					</h3>
					<table id="user_table">
						<thead>
							<tr>
								<th>
									User ID
								</th>
								<th>
									User Name
								</th>
								<th>
									Tries
								</th>
								<th>
									Wins
								</th>
								<th>
									Wins Percentage
								</th>
								<th>
									More Info
								</th>
							</tr>
						</thead>
						
						<tbody>
							{this.state.dataItems}
						</tbody>
						</table>
					
				</div>
			)
		
		}else{
			return (
				<div className="main_container">
					No games played... Someone must turn the dices...
				</div>
			);
		}
	}
	
	
}
