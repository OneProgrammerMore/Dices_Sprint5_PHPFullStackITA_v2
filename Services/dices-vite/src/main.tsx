import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './dices.tsx';
import MyHTMLDiv from './components/MyHtml.tsx';
import DicesBackground from './3jsComponents/dices-background.tsx';
import { DisplayMenuNavContext } from './contextSrc/MyContext.tsx';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import store from './app/store.ts';
import { Provider } from 'react-redux';
import * as Constants from './constants.tsx';

//let container: any = null;
let container: HTMLElement | null = null;

const App = () => {
  const [displayMenu, setDisplayMenu] = useState('navClosed');
  const [displayMenuCloseButton, setDisplayMenuCloseButton] =
    useState('hiddenClass');
  const [displayMenuOpenButton, setDisplayMenuOpenButton] =
    useState('visibleClass');

  return (
    
    <Provider store={store}>
      <Router basename={Constants.dices_Router_Prefix} >
        <DisplayMenuNavContext.Provider
          value={{
            displayMenu,
            setDisplayMenu,
            displayMenuCloseButton,
            setDisplayMenuCloseButton,
            displayMenuOpenButton,
            setDisplayMenuOpenButton
          }}
        >
          <div>
            <canvas id="dices-background"></canvas>
            <DicesBackground />
            <MyHTMLDiv navigate={useNavigate} />
          </div>
        </DisplayMenuNavContext.Provider>
      </Router>
    </Provider>
  );
};

document.addEventListener('DOMContentLoaded', function () {
  if (!container) {
    container = document.getElementById('MYHTML') as HTMLElement;
    const root = createRoot(container);
    root.render(<App />);
  }
});
