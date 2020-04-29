import React from 'react';
import { animated as a, interpolate, useSpring } from 'react-spring';

function BicepParticle() {
  const translationX = Math.random() * 75 + 15;
  const translationY = Math.random() * -150 - 50;

  const { opacity } = useSpring({
    from: { 
      opacity: 2,
    },
    opacity: 0,
    config: { tension: 20, friction: 15, clamp: true }
  });
  const { x } = useSpring({
    from: {
      x: 0
    },
    x: translationX,
    config: { tension: 75, friction: 30 }
  });
  const { y } = useSpring({
    from: {
      y: 0
    },
    y: translationY,
    config: { tension: 25, friction: 15 }
  });

  const animationStyle = {
    opacity: opacity.interpolate((opacity) => `${opacity}`),
    transform: interpolate([x, y], (x, y) => `translate(${x}px, ${y}px)`)
  };

  return (
    <a.span className="BicepParticle" style={animationStyle} role="img" aria-label="bicep">
      💪
    </a.span>
  );
};

export default BicepParticle;
