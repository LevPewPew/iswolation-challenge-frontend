import React from 'react';
import { Motion, spring } from 'react-motion';

// WARNING. i think only works when a single child is passed, but i will leave that as a "it's not a bug, it's a feature" as i don't need more than one children functionality anyway
function ArrowMotion (props) {
  return (
    <Motion
      defaultStyle={{ x: -2000, jiggle: 2 }}
      style={{
        x: spring(0, { stiffness: 600, damping: 30 }),
        jiggle: spring(0, { stiffness: 6400, damping: 5 })
      }}
    >
      {(style) => (React.cloneElement(props.children, { style: {
        transform: `translateX(${style.x}px) rotateZ(${style.jiggle}deg)`,
        transformOrigin: "100% 50%"
      }}))}
    </Motion>
  );
}

export default ArrowMotion;
