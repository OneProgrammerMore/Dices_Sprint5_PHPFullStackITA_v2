import {createRoot} from 'react-dom/client'
import {useState} from 'react';
import './dices.tsx'
import MyHTMLDiv from './components/MyHtml.tsx';
import DicesBackground from './3jsComponents/dices-background.tsx';
import {DisplayMenuNavContext} from './contextSrc/MyContext.tsx';

import store from './app/store.ts';
import { Provider } from 'react-redux';

let container: any = null;

const App = () => {
  
  const [displayMenu, setDisplayMenu] = useState('navClosed');
  const [displayMenuCloseButton, setDisplayMenuCloseButton] = useState('hiddenClass');
  const [displayMenuOpenButton, setDisplayMenuOpenButton] = useState('visibleClass');
  
  return (
      <Provider store={store}>
      <DisplayMenuNavContext.Provider value={{displayMenu , setDisplayMenu, displayMenuCloseButton, setDisplayMenuCloseButton, displayMenuOpenButton, setDisplayMenuOpenButton}}>
          <div>
              <canvas id='dices-background'>
              </canvas>
              <DicesBackground />
              <MyHTMLDiv/> 
          </div>
      </DisplayMenuNavContext.Provider>
      </Provider>
  );
};

document.addEventListener('DOMContentLoaded', function() {
  if (!container) {
    container = document.getElementById('MYHTML') as HTMLElement;
    const root = createRoot(container);
    root.render(
      <App />
    );
  }
});