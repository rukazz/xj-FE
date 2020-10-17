import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { Input } from 'antd';
import { ExpensiveTree } from './ExpensiveTree';

export function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useLayoutEffect(() => {
    textRef.current = text;
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current;
    console.log(currentText);
  }, [textRef]);

  return (
    <>
      <Input value={text} onChange={(e) => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
