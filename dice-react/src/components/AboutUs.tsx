import React from 'react';
import { withNavigation } from '../functions/withRouter.tsx';
import { MyContext, MyContextType } from '../contextSrc/MyContext.tsx';

import '../styles.css?inline'


interface IProps {
  props?: React.PropsWithChildren;
}
interface IState {
  jsonData?: string[];
  dataItems?: string[];
}

//export default class Home extends React.Component {
class AboutUs extends React.Component<IProps, IState> {
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
    return (
      <div className="about-us">
        This is the final sprint of th Bootcamp Full Stack Development by IT
        Academy in Barcelona made by Mario Gómez Garcia
      </div>
    );
  }
}
export default withNavigation(AboutUs);
