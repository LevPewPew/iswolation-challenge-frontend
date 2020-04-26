import React from 'react';
import { Motion, spring } from 'react-motion';

// WARNING. i think only works when a single child is passed, but i will leave that as a "it's not a bug, it's a feature" as i don't need more than one children functionality anyway
function SlabSlamMotion (props) {
  return (
    <Motion
      defaultStyle={{ z: 500 }}
      style={{
        z: spring(1, { stiffness: 1800, damping: 60 })
      }}
    >
      {
        (style) => {
          let motionStyle = {
            transform: `scale(${style.z})`,
            transformOrigin: "50% 50%"
          };

          return React.cloneElement(props.children, { style: motionStyle });
        }
      }
    </Motion>
  );
}

export default SlabSlamMotion;
