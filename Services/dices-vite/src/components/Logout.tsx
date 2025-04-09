import '../styles.css';
import React from 'react';
import { withNavigation } from '../functions/withRouter.tsx';

import * as Functions from '../dices.tsx';

import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';

interface IProps {
  props?: React.PropsWithChildren;
  navigate: (path: string) => void;
}

interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

class Logout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      jsonData: [],
      dataItems: []
    };
    this.logOutFunction = this.logOutFunction.bind(this);
    this.hideLoginFunction = this.hideLoginFunction.bind(this);
    this.hideRegisterPlayerFunction =
      this.hideRegisterPlayerFunction.bind(this);
    this.hideRegisterAdminFunction = this.hideRegisterAdminFunction.bind(this);
  }

  static contextType = MyContext;
  declare context: MyContextType;

  changeNavSectionAndUser = (mainType: string) => {
    this.props.navigate(mainType);
  };
  hideLoginFunction() {
    this.context.updateLoginFormDisplayStyle('none');
  }
  hideRegisterPlayerFunction() {
    this.context.updateRegisterPlayerFormDisplayStyle('none');
  }
  hideRegisterAdminFunction() {
    this.context.updateRegisterAdminFormDisplayStyle('none');
  }

  updateLogoutVisibility = (newVisibility: string) => {
    this.context.updateLogoutVisibilitySetter(newVisibility);
  };

  logOutFunction = () => {
    Functions.setCookie('token', '', 1);
    Functions.setCookie('userid', '', 1);
    this.context.updateValueUserTypeAndMain('None', 'Login');
    this.hideLoginFunction();
    this.hideRegisterPlayerFunction();
    this.hideRegisterAdminFunction();
    this.updateLogoutVisibility('none');
    this.changeNavSectionAndUser('/');
  };

  render() {
    return (
      <div
        className="LogOutDiv"
        onClick={this.logOutFunction}
        style={{ display: this.context.logoutVisibity }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            this.logOutFunction();
          }
        }}
      >
        <span className="icon icon-nav icon-exit"></span>
        Log Out
      </div>
    );
  }
}

export default withNavigation(Logout);
