import '../styles.css'
import React, {Suspense, lazy} from 'react';

import * as Constants from '../constants.tsx';
import * as Functions from '../dices.tsx';

const DicesPlay = lazy(() => import('../3jsComponents/dices.tsx'));
import {Commet} from 'react-loading-indicators';

interface IProps {
	props?: any;
}
interface IState {
  dice_1?: string;
  dice_2?: string;
  dices_sum?: number | string;
  throw_result?: string;
  playing_bool?: boolean;
}

export default class Play extends React.Component<IProps, IState>{
  
	constructor(props: any) {
		super(props);

		this.handleSubmitPlay = this.handleSubmitPlay.bind(this);
		this.playerPlay = this.playerPlay.bind(this);

		this.state = {
			dice_1: "5",
			dice_2: "5",
			dices_sum: "10",
			throw_result: "Everybody plays with dices, even god",
			playing_bool: false
		};

	}
	 
	handleSubmitPlay(event: any) {
		event.preventDefault();
		this.playerPlay();
	}
	
	convertDecToRoman(decNum: number){
		const decNumStr = decNum.toString();
		switch(decNumStr){
			case '1':
				return 'I';
			case '2':
				return 'II';
			case '3':
				return 'III';
			case '4':
				return 'IV';
			case '5':
				return 'V';
			case '6':
				return 'VI';
			case '7':
				return 'VII';
			case '8':
				return 'IIX';
			case '9':
				return 'IX';
			case '10':
				return 'X';
			case '11':
				return 'XI';
			case '12':
				return 'XII';
			case '13':
				return 'XIII';
			case '14':
				return 'XIV';
			case '15':
				return 'XV';
			default:
				return 'O_o';
		}
	}
	
	async playerPlayApiCall(){

		var token = Functions.getCookie('token');
		var user_id = Functions.getCookie('userid');
		var registerPlayerURI:string = '/api/players/' + user_id + '/games';
		var registerPlayerEndPoint:string = Constants.dices_URL + registerPlayerURI;
		
		const response = await fetch( registerPlayerEndPoint, {
			method: 'POST',
			body: JSON.stringify({
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			}
		});
		
		return response;
	}
	
	async playerPlay(){
	
		const response = await this.playerPlayApiCall();
		
		if(response.ok){
			const result = await response.json();
			var throwResultStr = '';
			if(result['dices_sum'] == 7){
				throwResultStr = "Congratulations!!!! You got lucky!!!";
			}else{
				throwResultStr = "Sorry... you lost the game!";
			}
			this.setState({ 
				dice_1: result['dice_1'],
				dice_2: result['dice_2'], 
				dices_sum: result['dices_sum'],
				throw_result: throwResultStr, 
				playing_bool: true
				});
		}

	}
	
	render(){
		let dices = {
			dice_1: Number(this.state.dice_1),
			dice_2: Number(this.state.dice_2),
			playing_bool: this.state.playing_bool!
		}
		return (
			<div className="main_container">
				<div className="goodLuck">
					<h3>
						Throw the fortunes rullete...
					</h3>
				
					<div id="dices">
						<Suspense  fallback={<Commet color="#32cd32" size="medium" text="" textColor="" />}>
							<canvas id="3js-comp-dices">

							</canvas>
							<DicesPlay {...dices} />
        				</Suspense>
					</div>
					
					<div className="form_section_play">
						
						<form id="play_form" className="form_user" onSubmit={this.handleSubmitPlay} >
						
							<input type="submit"  className="submitBttn" value="Play!" />
						</form>
					</div>			
				</div>
				
			</div>
		)
	}
}

