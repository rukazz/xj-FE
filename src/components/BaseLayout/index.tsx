import React, { useContext } from 'react';
import cls from 'classnames';
import './index.scss';
import { ThemeContext } from '../../hooks/useTheme';

interface IProps {}
const PREFIX = 'BaseLayout';
export const BaseLayout: React.FC<IProps> = React.memo(function BaseLayout({}) {
  const { color, dispatch } = useContext(ThemeContext);
  console.log('init color', color);
  return (
    <div className={cls(PREFIX)} style={{ background: color }}>
      <button onClick={() => dispatch('red')}>SET BLUE BACKGROUND</button>
      <button onClick={() => dispatch('yellow')}>SET YELLOW BACKGROUND</button>
    </div>
  );
});
