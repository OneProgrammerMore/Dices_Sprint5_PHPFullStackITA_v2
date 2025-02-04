import '../styles.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { withNavigation } from '../functions/withRouter.tsx';

import Play from './Play.tsx';
import Delete from './DeleteGames.tsx';
import ModifyName from './ModifyName.tsx';
import ListUsers from './ListUser.tsx';
import Ranking from './Ranking.tsx';
import Winner from './Winner.tsx';
import Loser from './Loser.tsx';
import Player from './Player.tsx';
import Home from './Home.tsx';
import * as Functions from '../dices.tsx';
import * as Constants from '../constants.tsx';

import Login from './Login.tsx';
import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';

interface IProps {
  props?: React.PropsWithChildren;
  navigate: (path: string) => void;
}
interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

class MainDiv extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  static contextType = MyContext;
  declare context: MyContextType;
  randomNumber: number = Math.random();
  chengeUserType = (newType: string) => {
    this.context.updateValue(newType);
  };
  changeNavSection = (newType: string) => {
    this.context.updateValueMain(newType);
    this.props.navigate(newType);
  };
  logoutVisibilitySet: string = 'flex';
  updateLogoutVisibility = (newVisibility: string) => {
    this.context.updateLogoutVisibilitySetter(newVisibility);
  };
  setAdmin() {
    this.chengeUserType('Admin');
    this.changeNavSection('Home');
    this.updateLogoutVisibility(this.logoutVisibilitySet);
  }

  setPlayer() {
    this.chengeUserType('Player');
    this.changeNavSection('Home');
    this.updateLogoutVisibility(this.logoutVisibilitySet);
  }

  async queryPlayerAndAdmin() {
    const token = Functions.getCookie('token');
    const playerid = Functions.getCookie('userid');

    const playerIDCookie = playerid;
    const playerURI: string = '/api/players/' + playerIDCookie + '/games';
    const playerEndPoint: string = Constants.dices_URL + playerURI;

    const response = await fetch(playerEndPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    });
    return response;
  }

  //Check if user is already Logged In (Cookies Exists) and Set page:
  async componentDidMount() {
    //Check cookie token and userid
    const userID = Functions.getCookie('userid');
    const token = Functions.getCookie('token');
    const role = Functions.getCookie('userRole');

    if (userID != '' && token != '') {
      if (role == 'admin') {
        this.setAdmin();
      } else if (role == 'player') {
        const response = await this.queryPlayerAndAdmin();
        if (response.ok) {
          this.setPlayer();
        }
      }
    }
  }

  render() {
    return (
      <Routes>
        <Route path="/" element={<Login navigate={this.props.navigate} />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Play" element={<Play />} />
        <Route path="/Delete" element={<Delete />} />
        <Route path="/ModifyName" element={<ModifyName />} />
        <Route path="/Player" element={<Player  />} />
        <Route path="/ListPlayers" element={<ListUsers navigate={this.props.navigate} />} />
        <Route path="/Ranking" element={<Ranking navigate={this.props.navigate} />} />
        <Route path="/Winner" element={<Winner navigate={this.props.navigate}/>} />
        <Route path="/Loser" element={<Loser navigate={this.props.navigate}/>} />
      </Routes>
    );
  }
}

export default withNavigation(MainDiv);
