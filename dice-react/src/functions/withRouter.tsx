import { useNavigate } from 'react-router-dom';
import { ComponentType } from 'react';
import { DisplayMenuNavContextInterface } from '../contextSrc/MyContext.tsx';

interface IProps {
  navigate?: (path: string) => void;
  displayMenuContext?: DisplayMenuNavContextInterface;
}

export function withNavigation<T extends object>(
  Component: ComponentType<T & IProps>
) {
  return function WrappedComponent(props: T) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
