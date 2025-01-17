import { useEffect, useContext } from 'react';
import { DisplayMenuNavContext } from '../contextSrc/MyContext.tsx';

function NavIcon({}) {
  const menuContext = useContext(DisplayMenuNavContext);

  const openMenu = () => {
    console.log('openeing');
    menuContext.setDisplayMenu('navOpen');
    menuContext.setDisplayMenuCloseButton('visibleClass');
    menuContext.setDisplayMenuOpenButton('hiddenClass');
    console.log('opened');
    console.log(menuContext.displayMenu);
  };

  const closeMenu = () => {
    menuContext.setDisplayMenu('navClosed');
    menuContext.setDisplayMenuCloseButton('hiddenClass');
    menuContext.setDisplayMenuOpenButton('visibleClass');
    console.log('closed');
    console.log(menuContext.displayMenu);
  };

  useEffect(() => {}, []);

  return (
    <div id="menu-icon">
      <a
        className={
          'nav-menu-icon icon icon-log icon-menu ' +
          menuContext.displayMenuOpenButton
        }
        onClick={() => openMenu()}
      ></a>
      <a
        className={
          'nav-side nav-menu-icon icon icon-log icon-close ' +
          menuContext.displayMenuCloseButton
        }
        onClick={() => closeMenu()}
      ></a>
    </div>
  );
}

export default NavIcon;
