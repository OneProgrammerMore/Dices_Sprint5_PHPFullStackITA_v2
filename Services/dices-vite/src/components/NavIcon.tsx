import { useEffect, useContext } from 'react';
import { DisplayMenuNavContext } from '../contextSrc/MyContext.tsx';

function NavIcon({}) {
  const menuContext = useContext(DisplayMenuNavContext);

  const openMenu = () => {
    menuContext.setDisplayMenu('navOpen');
    menuContext.setDisplayMenuCloseButton('visibleClass');
    menuContext.setDisplayMenuOpenButton('hiddenClass');
  };

  const closeMenu = () => {
    menuContext.setDisplayMenu('navClosed');
    menuContext.setDisplayMenuCloseButton('hiddenClass');
    menuContext.setDisplayMenuOpenButton('visibleClass');
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
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            () => openMenu()
          }
        }}
      ></a>
      <a
        className={
          'nav-side nav-menu-icon icon icon-log icon-close ' +
          menuContext.displayMenuCloseButton
        }
        onClick={() => closeMenu()}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            () => closeMenu()
          }
        }}
      ></a>
    </div>
  );
}

export default NavIcon;
