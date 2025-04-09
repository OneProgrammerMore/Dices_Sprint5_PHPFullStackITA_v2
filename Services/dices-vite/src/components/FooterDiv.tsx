import '../styles.css';
import React from 'react';

import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';

interface IProps {
  props?: React.PropsWithChildren;
  navigate: (path: string) => void;
}

interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

export default class FooterDiv extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  static contextType = MyContext;
  declare context: MyContextType;

  changeNavSection = (newType: string) => {
    this.context.updateValueMain(newType);
    this.props.navigate(newType);
  };
  //ToDo - Version 2  - Add Links Footer And Sections

  render() {
    return (
      <footer>
        <div
          className="footerLink"
          tabIndex={0}
          onClick={() => this.changeNavSection('home')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.changeNavSection('home');
            }
          }}
        >
          <span className="icon icon-footer icon-home"></span>
          Home
        </div>

        <div
          className="footerLink"
          tabIndex={0}
          onClick={() => this.changeNavSection('about-us')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.changeNavSection('about-us');
            }
          }}
        >
          <span className="icon icon-footer icon-info"></span>
          About Us
        </div>

        <div
          className="footerLink"
          tabIndex={0}
          onClick={() => this.changeNavSection('contact')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.changeNavSection('contact');
            }
          }}
        >
          <span className="icon icon-footer icon-contact"></span>
          Contact
        </div>
        <div
          className="footerLink"
          tabIndex={0}
          onClick={() => this.changeNavSection('legal')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.changeNavSection('legal');
            }
          }}
        >
          <span className="icon icon-footer icon-legal"></span>
          Legal
        </div>
      </footer>
    );
  }
}
