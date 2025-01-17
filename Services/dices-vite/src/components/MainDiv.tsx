import '../styles.css';
import React from 'react';

import Play from './Play.tsx';
import Delete from './DeleteGames.tsx';
import ModifyName from './ModifyName.tsx';
import ListUsers from './ListUser.tsx';
import Ranking from './Ranking.tsx';
import Winner from './Winner.tsx';
import Loser from './Loser.tsx';
import Player from './Player.tsx';
import Home from './Home.tsx';

import Login from './Login.tsx';
import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';

interface IProps {
  props?: React.PropsWithChildren;
}
interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

export default class MainDiv extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  static contextType = MyContext;
  declare context: MyContextType;
  randomNumber: number = Math.random();

  render() {
    return (
      <MyContext.Consumer>
        {(context) => {
          if (!context) {
            return null;
          } else {
            switch (context.mainSwitch) {
              //For ALL
              case 'Login':
                return <Login />;
              //ToDo - Version 1 - Change Login To Home Component
              case 'Home':
                return <Home />;

              //For Player
              case 'Play':
                return <Play />;
              case 'Delete':
                return <Delete />;
              case 'ModifyName':
                return <ModifyName />;
              case 'Player':
                return <Player />;

              //For Admin
              case 'ListPlayers':
                return <ListUsers />;
              case 'Ranking':
                return <Ranking />;
              case 'Winner':
                return <Winner />;
              case 'Loser':
                return <Loser />;
              default:
                return <Login />;
            }
          }
        }}
      </MyContext.Consumer>
    );
  }
}
