import { useNavigate } from 'react-router-dom';
import { ComponentType } from "react";
import {
  DisplayMenuNavContextInterface
} from '../contextSrc/MyContext.tsx';

interface IProps {
  navigate?: (path: string) => void;
  displayMenuContext?: DisplayMenuNavContextInterface; 
}

/*
export function withNavigation(Component: React.ComponentType<any>) {
  return function WrappedComponent(props: any) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}*/
/*
export function withNavigation<T extends object>(
  Component: ComponentType<T & IProps>
) {
  return function WrappedComponent(props: T) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}*/
/*
export function withNavigation<T extends object>(
  Component: ComponentType<T> )
  {
  return function WrappedComponent(props: T) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}*/

export function withNavigation<T extends Object>(Component: ComponentType<T & IProps>) {
  return function WrappedComponent(props: T) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
/*
export function withNavigation<P>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
*/
/*
export function withNavigation<P extends object>(
  Component: React.ComponentType<P & { navigate: (path: string) => void }>
) {
  return function WrappedComponent(props: P) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}*/
