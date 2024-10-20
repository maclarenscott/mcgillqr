import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    height: 0,
    width: 0
  });

  function debounce(fn:() => void, ms:number) {
    let timer:NodeJS.Timeout | null;
    return () => {
      if (!!timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
   
        fn();
      }, ms);
    };
  }

  useEffect(() => {
    windowSize.height = window.innerHeight;
    windowSize.width = window.innerWidth;

    const handleResize = debounce(
      () =>
        setWindowSize({
          height: window.innerHeight,
          width: window.innerWidth
        }),
      2000
    );

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
