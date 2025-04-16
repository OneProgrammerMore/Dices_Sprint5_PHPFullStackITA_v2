import '../styles.css';
import React from 'react';

import NavEmpty from './NavEmpty.tsx';
import NavPlayer from './NavPlayer.tsx';
import NavAdmin from './NavAdmin.tsx';
import * as Functions from '../dices.tsx';
import * as Constants from '../constants.tsx';
import { withNavigation } from '../functions/withRouter.tsx';
import {
  MyContext,
  MyContextType,
  DisplayMenuNavContext
} from '../contextSrc/MyContext.tsx';

interface IProps {
  props?: React.PropsWithChildren;
  navigate: (path: string) => void;
}

interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

class NavigatorDiv extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  static contextType = MyContext;
  declare context: MyContextType;

  chengeUserType = (newType: string) => {
    this.context.updateValue(newType);
  };

  setAdmin() {
    this.chengeUserType('Admin');
  }

  setPlayer() {
    this.chengeUserType('Player');
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
    this.render();
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

  render() {
    return (
      <MyContext.Consumer>
        {(context) => {
          if (!context) {
            return null;
          }
          switch (context.userTypeSwitch) {
            case 'None':
              return <NavEmpty />;
            case 'Player':
              return (
                <DisplayMenuNavContext.Consumer>
                  {(displayMenuNavContext) => (
                    <NavPlayer
                      displayMenuContext={displayMenuNavContext}
                      navigate={this.props.navigate}
                    />
                  )}
                </DisplayMenuNavContext.Consumer>
              );
            case 'Admin':
              return (
                <DisplayMenuNavContext.Consumer>
                  {(displayMenuNavContext) => (
                    <NavAdmin
                      displayMenuContext={displayMenuNavContext}
                      navigate={this.props.navigate}
                    />
                  )}
                </DisplayMenuNavContext.Consumer>
              );
            default:
              return <NavEmpty />;
          }
        }}
      </MyContext.Consumer>
    );
  }
}

export default withNavigation(NavigatorDiv);
