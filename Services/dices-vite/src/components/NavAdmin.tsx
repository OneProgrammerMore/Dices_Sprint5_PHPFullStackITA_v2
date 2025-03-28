import '../styles.css';
import React from 'react';

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


class NavAdmin extends React.Component<IProps, IState> {
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

  render() {
    return (
      <div
        id="AdminNav"
        className={'navSection ' + this.props.displayMenuContext.displayMenu}
      >
        <div className="navName">- Admin -</div>

        <div className="navItems">
          <div className="navItem">
            <div onClick={() => this.changeNavSection('list-players')}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.changeNavSection('list-players')
                }
              }}
              >
              <span className="icon icon-nav icon-list"></span>
              List Players
            </div>
          </div>
          <div className="navItem">
            <div onClick={() => this.changeNavSection('ranking')}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.changeNavSection('ranking')
                }
              }}
              >
              <span className="icon icon-nav icon-cup"></span>
              Ranking
            </div>
          </div>
          <div className="navItem">
            <div onClick={() => this.changeNavSection('loser')}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.changeNavSection('loser')
                }
              }}
              >
              <span className="icon icon-nav icon-worst"></span>
              Worst
            </div>
          </div>
          <div className="navItem">
            <div onClick={() => this.changeNavSection('winner')}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.changeNavSection('winner')
                }
              }}
              >
              <span className="icon icon-nav icon-top"></span>
              Best
            </div>
          </div>
        </div>
        <NavIcon />
      </div>
    );
  }
}
export default withNavigation(NavAdmin);
