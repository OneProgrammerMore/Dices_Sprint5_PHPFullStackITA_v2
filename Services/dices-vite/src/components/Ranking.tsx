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
	dataFetched: boolean;
	dataExists: boolean;
}

export default class Ranking extends React.Component<IProps, IState>{
  
	constructor(props: any) {
		super(props);

		this.state = {
			jsonData: [],
			dataItems: [],
			dataFetched: false,
			dataExists: true,
		};
	}
  
	static contextType = MyContext;
	declare context: MyContextType;
	
	changeNavSectionAndUser = (userID: string, mainType: string) => {
		this.context.updateValueMainAndUserID(userID, mainType);
	}
	
	async rankingApiCall(){

		var token = Functions.getCookie('token');

		var rankingURI:string = '/api/players/ranking';
		var rankingEndPoint:string = Constants.dices_URL + rankingURI;
		
		const response = await fetch( rankingEndPoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
		});
		
		return response;		
	}
	
	
	
	
	async componentDidMount(){
		console.log("The Ranking component did mount started");
		
		const response = await this.rankingApiCall();

		if(response.ok){
			
			response.json().then(
				(jsonDataPlayers) => {
					var arr: any [] = [];
					Object.keys(jsonDataPlayers).forEach(key => arr.push({
						id: jsonDataPlayers[key]['user_id'], 
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
											<div onClick={() => this.changeNavSectionAndUser(player.id, 'Player') } > 
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
			).catch(
				() => {
					this.setState({
						dataFetched: true,
						dataExists: false
					});

				}

			);
		}else{
			this.setState({
				dataFetched: true,
				dataExists: false
			});
		}
		
	}
	
	render(){

		if(this.state.dataFetched == false){
			return (
				<div className="main_container">
					<Commet color="#32cd32" size="medium" text="" textColor="" />
				</div>
			);
				
		}else if(this.state.dataExists == true){

			return (
				<div className="main_container">
				<h3>
					Ranking
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

