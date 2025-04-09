import '../styles.css';
import React from 'react';

import * as Functions from '../dices.tsx';
import { withNavigation } from '../functions/withRouter.tsx';

import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';

interface IProps {
  props?: React.PropsWithChildren;
}
interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

//export default class Home extends React.Component {
class Home extends React.Component<IProps, IState> {
  //constructor(props: React.PropsWithChildren) {
  constructor(props: IProps) {
    super(props);
  }

  static contextType = MyContext;
  declare context: MyContextType;

  changeNavSectionAndUser = (userID: string, mainType: string) => {
    this.context.updateValueMainAndUserID(userID, mainType);
  };

  render() {
    let messageL1: string = '';
    let messageL2: string = '';
    switch (this.context.userTypeSwitch) {
      case 'Player':
        messageL1 = 'You are logged as player!';
        messageL2 = 'Time to roll the dices!';
        break;
      case 'Admin':
        messageL1 = 'You are logged as admin!';
        messageL2 = 'Quite boring but at least can you see...';
        break;
      default:
        break;
    }

    return (
      <div className="home">
        Welcome to dices {Functions.getCookie('userName')}!
        <br />
        {messageL1}
        <br />
        {messageL2}
      </div>
    );
  }
}
export default withNavigation(Home);
