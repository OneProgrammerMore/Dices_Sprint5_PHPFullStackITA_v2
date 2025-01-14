import '../styles.css'
import React, {ReactElement} from 'react';

import * as Constants from '../constants.tsx';
import * as Functions from '../dices.tsx';
import {Commet} from 'react-loading-indicators';

import {MyContext, MyContextType} from '../contextSrc/MyContext.tsx';


interface Game {
	id: string;
	player_id: string;
	date: string;
	dice_1: string;
	dice_2: string;
	dices_sum: string;
}

interface JsonDataPlayers {
	[key: string]: {
		id: string;
		user_id: string;
		created_at: string;
		dice_1: string;
		dice_2: string;
		dices_sum: string;
	};
}
type DataItemsState = ReactElement[][];


interface IProps {
	props?: React.PropsWithChildren;
	player_id?: number;
}

interface IState {
	jsonData?: string[];
	dataItems?: DataItemsState;
	player_id?: number | string;
	dataFetched: boolean;
	dataExists: boolean;
}

export default class Player extends React.Component<IProps, IState>{
  
	constructor(props: IProps) {
		super(props);

		this.state = {
			jsonData: [],
			dataItems: [],
			player_id: this.props.player_id,
			dataFetched: false,
			dataExists: true,
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.playerApiCall = this.playerApiCall.bind(this);
	}
	
	static contextType = MyContext;
	declare context: MyContextType;
	
	async playerApiCall(){
	  
		//ToDO - Version 1 - Cookieess!!! Bake some good cookies!!!
		const token = Functions.getCookie('token');
		
		const playerIDContext = this.context.playerID;
		const playerURI:string = '/api/players/'+playerIDContext+'/games';
		const playerEndPoint:string = Constants.dices_URL + playerURI;
		
		const response = await fetch( playerEndPoint, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
			
		});
		
		return response;		
	}
  

	async componentDidMount(){
	
		try {
			const response = await this.playerApiCall();
			if(response.ok){
				response.json().then(
					(jsonDataPlayers: JsonDataPlayers) => {
						const arr: Game[] = [];
			
						Object.keys(jsonDataPlayers).forEach(key => arr.push({
							player_id: jsonDataPlayers[key]['user_id'], 
							id: jsonDataPlayers[key]['id'], 
							date: jsonDataPlayers[key]['created_at'],
							dice_1: jsonDataPlayers[key]['dice_1'],
							dice_2: jsonDataPlayers[key]['dice_2'],
							dices_sum: jsonDataPlayers[key]['dices_sum']
							}));
	
						this.setState({
							dataItems: [
								arr.map(
								(game)=>{
										const date = new Date(game.date);
										return(
											<tr key={game.id}>
												<td>
													{game.player_id}
												</td>
												<td>
													{game.id}
												</td>
												<td>
													{date.toLocaleDateString() + ' - ' + date.toLocaleTimeString()}
												</td>
												<td>
													{game.dice_1}
												</td>
												<td>
													{game.dice_2}
												</td>
												<td>
													{game.dices_sum}
												</td>
											</tr>
											)
										}
								
								)
								
							],
							dataFetched: true,
							dataExists: true
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
		}catch {
			this.setState({
				dataFetched: true,
				dataExists: false
			});
		}

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
						Player
					</h3>
					
					<table id="player_table">
						<thead>
							<tr>
								<th>
									Player ID
								</th>
								<th>
									Game ID
								</th>
								<th>
									Creaated At
								</th>
								<th>
									Dice 1
								</th>
								<th>
									Dice 2
								</th>
								<th>
									Result
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

