import '../styles.css';
import React from 'react';

import * as Functions from '../dices.tsx';

import {
  MyContext,
  MyContextType,
  DisplayMenuNavContextInterface
} from '../contextSrc/MyContext.tsx';
import NavIcon from './NavIcon.tsx';

import { withNavigation } from '../functions/withRouter.tsx';
interface IProps {
  props?: React.PropsWithChildren;
  displayMenuContext: DisplayMenuNavContextInterface;
  navigate: (path: string) => void;
}

interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

class NavPlayer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  static contextType = MyContext;
  declare context: MyContextType;

  changeNavSection = (newType: string) => {
    this.context.updateValueMain(newType);
    this.props.navigate(newType);
    this.props.displayMenuContext.setDisplayMenuCloseButton('hiddenClass');
    this.props.displayMenuContext.setDisplayMenuOpenButton('visibleClass');
    this.props.displayMenuContext.setDisplayMenu('navClosed');
  };

  changeNavSectionAndUser = (userID: string, mainType: string) => {
    this.context.updateValueMainAndUserID(userID, mainType);
    this.props.navigate(mainType);
    this.props.displayMenuContext.setDisplayMenuCloseButton('hiddenClass');
    this.props.displayMenuContext.setDisplayMenuOpenButton('visibleClass');
    this.props.displayMenuContext.setDisplayMenu('navClosed');
  };

  render() {
    return (
      <div
        id="UserNav"
        className={'navSection ' + this.props.displayMenuContext.displayMenu}
      >
        <div className="navName">- Player -</div>

        <div className="navItems">
          <div className="navItem">
            <div onClick={() => this.changeNavSection('Play')}>
              <span className="icon icon-nav icon-dices"></span>
              Play
            </div>
          </div>
          <div className="navItem">
            <div onClick={() => this.changeNavSection('Delete')}>
              <span className="icon icon-nav icon-trash"></span>
              Delete
            </div>
          </div>
          <div className="navItem">
            <div onClick={() => this.changeNavSection('ModifyName')}>
              <span className="icon icon-nav icon-pencil"></span>
              Modify Name
            </div>
          </div>
          <div className="navItem">
            <div
              onClick={() =>
                this.changeNavSectionAndUser(
                  Functions.getCookie('userid'),
                  'Player'
                )
              }
            >
              <span className="icon icon-nav icon-player"></span>
              Show Player
            </div>
          </div>
        </div>

        <NavIcon />
      </div>
    );
  }
}

export default withNavigation(NavPlayer);
