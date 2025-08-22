import '../styles.css?inline';
import React from 'react';

interface IProps {
  props?: React.PropsWithChildren;
}

interface IState {
  jsonData?: string[];
  dataItems?: string[];
}
export default class NavEmpty extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div id="EmptyNav" className="navSection">
        If the ruler does not know your name... <br />
        With dices shall not you play!
      </div>
    );
  }
}
