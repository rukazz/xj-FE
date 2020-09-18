// useRef, ref不仅可以用于DOM refs，【ref】对象是一个current属性可变且可以容纳任何值的通用容器。类似于一个class的实例属性。
// for example

import React, { useRef, useEffect } from 'react';

function Timer() {
  const intervalRef = useRef<any>();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
}

// 获取上一轮的props /state

function Counter() {

}
