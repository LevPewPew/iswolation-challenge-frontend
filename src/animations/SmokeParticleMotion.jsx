import React from 'react';
import { Motion, spring } from 'react-motion';

// WARNING. i think only works when a single child is passed, but i will leave that as a "it's not a bug, it's a feature" as i don't need more than one children functionality anyway
function SmokeParticleMotion(props) {
  const randX = Math.random() * 80 + 20;
  const randY = Math.random() * -150 - 50;

  return (
    <Motion
      defaultStyle={{ x: 0, y: 0, opacity: 2 }}
      style={{
        x: spring(randX, { stiffness: 75, damping: 25 }),
        y: spring(randY, { stiffness: 25, damping: 15 }),
        opacity: spring(0, { stiffness: 20, damping: 15 })
      }}
    >
      {(style) => (React.cloneElement(props.children, { style: {
        opacity: style.opacity,
        transform: `translate(${style.x}px, ${style.y}px)`
      }}))}
    </Motion>
  );
}

export default SmokeParticleMotion;
