import React, { useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react';

const LazyLoad = forwardRef(function LazyLoad({ children, fallback = <div style={{ minHeight:"302px" }}>fallback</div>, threshold = 0.1, as: Component = 'div', ...props }, ref) {
  const [inView, setInView] = useState(false);
  const divRef = useRef(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setInView(false);
    },
    get current() {
      return divRef.current;
    }
  }));
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    const currentRef = divRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
      setInView(false);
    };
  }, [threshold]);

  return (
    <Component ref={divRef} {...props}>
      {inView ? children : fallback}
    </Component>
  );
});

export default LazyLoad;
