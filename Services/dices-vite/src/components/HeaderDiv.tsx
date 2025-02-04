import '../styles.css';
import React from 'react';
import Logout from './Logout.tsx';

import * as Functions from '../dices.tsx';

import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';
import { withNavigation } from '../functions/withRouter.tsx';

interface IProps {
  props?: React.PropsWithChildren;
  navigate: (path: string) => void;
}

interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

class HeaderDiv extends React.Component<IProps, IState> {
  static contextType = MyContext;
  declare context: MyContextType;

  constructor(props: IProps) {
    super(props);
  }

  changeNavSection = (newType: string) => {
    if (Functions.getCookie('userid') != '') {
      this.context.updateValueMain(newType);
      this.props.navigate(newType);
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

          <Logout navigate={this.props.navigate} />
        </div>
      </header>
    );
  }
}

export default withNavigation(HeaderDiv);
