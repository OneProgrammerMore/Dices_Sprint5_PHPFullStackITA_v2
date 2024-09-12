import React, { useState, ReactNode} from 'react'

interface MyContextType {
  userTypeSwitch: string;
  updateValue: (newValue: string) => void;
  mainSwitch: string;
  updateValueMain: (newValue: string) => void;
  playerID: string;
  updateValueMainAndUserID: (newValueUser: string, newValueMain: string) => void;
  updateValueUserTypeAndMain: (newValueUserType: string, newValueMain: string) => void;

  logoutDisplayStyle: string;
  loginFormDisplayStyle: string;
  registerPlayerFormDisplayStyle: string;
  registerAdminFormDisplayStyle: string;

  updateLogoutDisplayStyle: (newValueLogoutDisplayStyle: string) => void;
  updateLoginFormDisplayStyle: (newValueLoginDisplayStyle: string) => void;
  updateRegisterPlayerFormDisplayStyle: (newValueRegisterPlayerFormDisplayStyle: string) => void;
  updateRegisterAdminFormDisplayStyle: (newValueRegisterAdminFormDisplayStyle: string) => void;

  logoutVisibity: string;
  updateLogoutVisibilitySetter: (newLogoutVisibity:string) => void;
}
const MyContext = React.createContext<MyContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}
// Create a context provider
const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [userTypeSwitch, setValueUserType] = useState('None');
  const [mainSwitch, setValueMain] = useState('Login');
  const [playerID, setValueUserID] = useState('1');

  const [logoutDisplayStyle, setStyleLogoutDisplay] = useState('none');
  const [loginFormDisplayStyle, setStyleLoginFormDisplay] = useState('none');
  const [registerPlayerFormDisplayStyle, setStyleRegisterPlayerFormDisplay] = useState('none');
  const [registerAdminFormDisplayStyle, setStyleRegisterAdminFormDisplay] = useState('none'); 
  
  const updateValue = (newValue: string) => {
    setValueUserType(newValue);
  };
  
  const updateValueMain = (newValue: string) => {
    setValueMain(newValue);
  };
  
  const updateValueMainAndUserID = (newValueUser: string, newValueMain: string) => {
    setValueUserID(newValueUser);
    setValueMain(newValueMain);
  };
  
  const updateValueUserTypeAndMain = (newValueUserType: string, newValueMain: string) => {
    setValueUserType(newValueUserType);
    setValueMain(newValueMain);
  };

  const updateLogoutDisplayStyle = (newValueLogoutDisplayStyle: string) => {
    setStyleLogoutDisplay(newValueLogoutDisplayStyle);
  }
  const updateLoginFormDisplayStyle = (newValueLoginDisplayStyle: string) => {
    setStyleLoginFormDisplay(newValueLoginDisplayStyle);
  }
  const updateRegisterPlayerFormDisplayStyle = (newValueRegisterPlayerFormDisplayStyle: string) => {
    setStyleRegisterPlayerFormDisplay(newValueRegisterPlayerFormDisplayStyle);
  }
  const updateRegisterAdminFormDisplayStyle = (newValueRegisterAdminFormDisplayStyle: string) => {
    setStyleRegisterAdminFormDisplay(newValueRegisterAdminFormDisplayStyle);
  }

  const [logoutVisibity, updateLogoutVisibility] = useState('none'); 

  const updateLogoutVisibilitySetter = (newLogoutVisibity: string) => {
    updateLogoutVisibility(newLogoutVisibity);
  }
	
  return (
    <MyContext.Provider value={{ userTypeSwitch, updateValue,mainSwitch, updateValueMain, playerID, updateValueMainAndUserID, updateValueUserTypeAndMain,   
      logoutDisplayStyle, updateLogoutDisplayStyle,
      loginFormDisplayStyle, updateLoginFormDisplayStyle,
      registerPlayerFormDisplayStyle, updateRegisterPlayerFormDisplayStyle, 
      registerAdminFormDisplayStyle, updateRegisterAdminFormDisplayStyle,
      logoutVisibity, updateLogoutVisibilitySetter
      }}>
      {children}
    </MyContext.Provider>
  );
};

interface DisplayMenuNavContextInterface{
  displayMenu: string;
  setDisplayMenu: (newValue: string) => void;
  displayMenuCloseButton: string;
  setDisplayMenuCloseButton: (newValue: string) => void;
  displayMenuOpenButton: string;
  setDisplayMenuOpenButton: (newValue: string) => void;
}

const DisplayMenuNavContext = React.createContext<DisplayMenuNavContextInterface>({
  displayMenu: 'navClosed',
  setDisplayMenu: () => {},
  displayMenuCloseButton: 'hiddenClass',
  setDisplayMenuCloseButton: () => {},
  displayMenuOpenButton: 'visibleClass',
  setDisplayMenuOpenButton: () => {},
});

export {
	MyContext,
	MyContextProvider,
  DisplayMenuNavContext
}
export type{
	MyContextType,
  DisplayMenuNavContextInterface
}
