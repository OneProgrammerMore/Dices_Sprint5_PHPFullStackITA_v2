import '../styles.css';
import React, { ReactElement } from 'react';

import * as Constants from '../constants.tsx';
import * as Functions from '../dices.tsx';
import { Commet } from 'react-loading-indicators';

import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';
import { withNavigation } from '../functions/withRouter.tsx';

interface Player {
  id: string;
  name: string;
  tries: number;
  wins: number;
  wins_perc: number;
}

interface JsonDataPlayers {
  [key: string]: {
    user_id: string;
    user_name: string;
    user_tries: number;
    user_wins: number;
    wins_perc: number;
  };
}
type DataItemsState = ReactElement[][];

interface IProps {
  props?: React.PropsWithChildren;
  navigate: (path: string) => void;
}

interface IState {
  jsonData?: string[];
  dataItems?: DataItemsState;
  dataFetched: boolean;
  dataExists: boolean;
}

class Loser extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      jsonData: [],
      dataItems: [],
      dataFetched: false,
      dataExists: true
    };
  }
  static contextType = MyContext;
  declare context: MyContextType;

  changeNavSectionAndUser = (userID: string, mainType: string) => {
    this.context.updateValueMainAndUserID(userID, mainType);
    const newPath = '/' + mainType;
    this.props.navigate(newPath);
  };

  async loserApiCall() {
    const token = Functions.getCookie('token');

    const loserURI: string = '/api/players/ranking/loser';
    const loserEndPoint: string = Constants.dices_URL + loserURI;

    const response = await fetch(loserEndPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    });

    return response;
  }

  async componentDidMount() {
    const response = await this.loserApiCall();

    if (response.ok) {
      response
        .json()
        .then((jsonDataPlayers: JsonDataPlayers) => {
          const arr: Player[] = [];
          Object.keys(jsonDataPlayers).forEach((key) =>
            arr.push({
              id: jsonDataPlayers[key]['user_id'],
              name: jsonDataPlayers[key]['user_name'],
              tries: jsonDataPlayers[key]['user_tries'],
              wins: jsonDataPlayers[key]['user_wins'],
              wins_perc: jsonDataPlayers[key]['wins_perc']
            })
          );

          this.setState({
            dataItems: [
              arr.map((player) => {
                return (
                  <tr key={player.id}>
                    <td>{player.id}</td>
                    <td>{player.name}</td>
                    <td>{player.tries}</td>
                    <td>{player.wins}</td>
                    <td>{player.wins_perc.toFixed(3)}</td>
                    <td>
                      <div
                        onClick={() =>
                          this.changeNavSectionAndUser(player.id, 'player')
                        }
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            this.changeNavSectionAndUser(player.id, 'player');
                          }
                        }}
                        className="info-button"
                      >
                        <span className="icon icons-table icon-info"></span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ],
            dataFetched: true
          });
        })
        .catch(() => {
          this.setState({
            dataFetched: true,
            dataExists: false
          });
        });
    }
  }

  render() {
    if (this.state.dataFetched == false) {
      return (
        <div className="main_container">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      );
    } else if (this.state.dataExists == true) {
      return (
        <div className="main_container">
          <h3>Loser...</h3>
          <table id="user_table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Tries</th>
                <th>Wins</th>
                <th>Wins Percentage</th>
                <th>More Info</th>
              </tr>
            </thead>

            <tbody>{this.state.dataItems}</tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="main_container">
          No games played... Someone must turn the dices...
        </div>
      );
    }
  }
}

export default withNavigation(Loser);
