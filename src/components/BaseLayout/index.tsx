import React, { useContext, useState, useRef, useEffect } from 'react';
import cls from 'classnames';
import './index.scss';
import { ThemeContext } from '../../hooks/useTheme';
import { Form } from '../TestMemo';

interface IProps {}
const PREFIX = 'BaseLayout';
export const BaseLayout: React.FC<IProps> = React.memo(function BaseLayout({}) {
  const { color, dispatch } = useContext(ThemeContext);

  const [count, setCount] = useState(0);

  const prevCountRef = useRef<any>();

  useEffect(() => {
    prevCountRef.current = count;
    console.log('render in effect', prevCountRef.current);
  });

  const prevCount = prevCountRef.current;

  console.log('prev count', prevCountRef.current);

  return (
    <div className={cls(PREFIX)} style={{ background: color }}>
      before: {prevCount}
      after: {count}
      {/* <button onClick={() => dispatch('red')}>SET BLUE BACKGROUND</button>
      <button onClick={() => dispatch('yellow')}>SET YELLOW BACKGROUND</button>
      <button onClick={() => setCount((v) => v + 1)}>set Count +1</button>
      <button onClick={() => setCount((v) => v - 1)}>set count -1</button> */}
      <Form />
    </div>
  );
});
