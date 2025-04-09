import '../styles.css';
import React from 'react';

import HeaderDiv from './HeaderDiv.tsx';
import NavigatorDiv from './NavigatorDiv.tsx';
import MainDiv from './MainDiv.tsx';
import FooterDiv from './FooterDiv.tsx';

import { MyContextProvider } from '../contextSrc/MyContext.tsx';
import { withNavigation } from '../functions/withRouter.tsx';

interface IProps {
  props?: React.PropsWithChildren;
  navigate: (path: string) => void;
}
interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

class MyHTMLDiv extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div id="mainContainer">
        <MyContextProvider>
          <HeaderDiv navigate={this.props.navigate} />

          <nav id="nav">
            <NavigatorDiv navigate={this.props.navigate} />
          </nav>

          <main id="root">
            <MainDiv navigate={this.props.navigate} />
          </main>

          <FooterDiv navigate={this.props.navigate} />
        </MyContextProvider>
      </div>
    );
  }
}

export default withNavigation(MyHTMLDiv);
