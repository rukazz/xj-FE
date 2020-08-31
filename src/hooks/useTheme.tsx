import React, { useReducer } from 'react';

interface IThemeContext {
  color: string;
  dispatch: React.Dispatch<any>;
}

const defaultContextValue: IThemeContext = {
  color: 'blue',
  dispatch: () => null,
};

export const ThemeContext = React.createContext<IThemeContext>(defaultContextValue);

export const ThemeProvider: React.FC = ({ children }) => {
  const initialState = 'grey';

  const reducer = (state: string, action: string) => {
    switch (action) {
      case 'yellow':
        return 'yellow';
      case 'red':
        return 'red';
      default:
        return state;
    }
  };

  const [color, dispatch] = useReducer(reducer, initialState);

  return <ThemeContext.Provider value={{ color, dispatch }}>{children}</ThemeContext.Provider>;
};
