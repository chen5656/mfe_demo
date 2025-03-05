import React from 'react';

export function wrapAngularComponent(importFn: () => Promise<any>) {
  return React.lazy(async () => {
    const { default: Component } = await importFn();
    
    return {
      default: () => {
        const ref = React.useRef(null);
        
        React.useEffect(() => {
          let cleanup: (() => void) | undefined;
          
          if (ref.current) {
            debugger
            Component.mount(ref.current).then(unmount => {
              cleanup = unmount;
            });
          }
          
          return () => cleanup?.();
        }, []);

        return React.createElement('div', { ref });
      }
    };
  });
}