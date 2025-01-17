import '../styles.css';
import React from 'react';
import Logout from './Logout.tsx';

import * as Functions from '../dices.tsx';

import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';

export class HeaderDiv extends React.Component {
  static contextType = MyContext;
  declare context: MyContextType;

  constructor(props: React.PropsWithChildren) {
    super(props);
  }

  changeNavSection = (newType: string) => {
    if (Functions.getCookie('userid') != '') {
      this.context.updateValueMain(newType);
    } else {
      alert('It is necessary to be logged in in order to go to home page');
    }
  };

  render() {
    return (
      <header>
        <div id="HeaderLeft">
          <div id="WebLogo"></div>
          <div id="WebName" onClick={() => this.changeNavSection('Home')}>
            Dices
          </div>
        </div>
        <div id="HeaderRight">
          <Logout />
        </div>
      </header>
    );
  }
}
