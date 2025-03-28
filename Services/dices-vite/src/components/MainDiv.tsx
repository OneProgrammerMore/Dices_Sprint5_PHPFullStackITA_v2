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

import AboutUs from './AboutUs.tsx';
import Contact from './Contact.tsx';
import Legal from './Legal.tsx';

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
    this.changeNavSection('home');
    this.updateLogoutVisibility(this.logoutVisibilitySet);
  }

  setPlayer() {
    this.chengeUserType('Player');
    this.changeNavSection('home');
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
    const userID = Functions.getCookie('userid');
    const token = Functions.getCookie('token');
    const role = Functions.getCookie('userRole');

    if(userID == ""){
      return (
        <Routes>
          <Route path="/" element={<Login navigate={this.props.navigate} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<Login navigate={this.props.navigate} />} />
        </Routes>
      );
    }else if(role == 'admin'){
      return (
        <Routes>
          <Route path="/" element={<Login navigate={this.props.navigate} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/player" element={<Player  />} />
          <Route path="/list-players" element={<ListUsers navigate={this.props.navigate} />} />
          <Route path="/ranking" element={<Ranking navigate={this.props.navigate} />} />
          <Route path="/winner" element={<Winner navigate={this.props.navigate}/>} />
          <Route path="/loser" element={<Loser navigate={this.props.navigate}/>} />
  
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<Home />} />
        </Routes>
      );
    }else if(role == 'player'){
      return (
        <Routes>
          <Route path="/" element={<Login navigate={this.props.navigate} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/modify-name" element={<ModifyName />} />
          <Route path="/player" element={<Player  />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<Home />} />
        </Routes>
      );
    }else{
      console.log("What are you doing?")
    }

    /*
    return (
      <Routes>
        <Route path="/" element={<Login navigate={this.props.navigate} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/modify-name" element={<ModifyName />} />
        <Route path="/player" element={<Player  />} />
        <Route path="/list-players" element={<ListUsers navigate={this.props.navigate} />} />
        <Route path="/ranking" element={<Ranking navigate={this.props.navigate} />} />
        <Route path="/winner" element={<Winner navigate={this.props.navigate}/>} />
        <Route path="/loser" element={<Loser navigate={this.props.navigate}/>} />

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    );*/
  }
}

export default withNavigation(MainDiv);
