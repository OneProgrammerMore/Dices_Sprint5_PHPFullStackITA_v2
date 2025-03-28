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
class Contact extends React.Component<IProps, IState> {
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
      <div className="contact">
        It is possible to contact me by the links provided in my portfolio landing... <br/>or by github under @oneprogrammermore.
      </div>
    );
  }
}
export default withNavigation(Contact);
