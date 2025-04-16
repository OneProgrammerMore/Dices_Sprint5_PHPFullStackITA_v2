import React from 'react';
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
class Legal extends React.Component<IProps, IState> {
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
      <div className="legal">
        <h1>&quot;Legal&quot; Agreement</h1>
        <p>
          This site is just a demostration of an improved bootcamp project. 
          <br/>
          The owner of the site does not make himself liable of any damage that this site usage may produce.
          <br/>
          If you use this site you can access all features without the need of real data as e-mails are not validated 
          and we recommend and ask to you to do NOT use any real data in this site.
        </p>
      </div>
    );
  }
}
export default withNavigation(Legal);
