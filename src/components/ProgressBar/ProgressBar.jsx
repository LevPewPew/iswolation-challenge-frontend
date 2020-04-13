import React, { useEffect, useState } from 'react';

function ProgressBar({ maxReps, name, reps }) {
  const [ percentProgress, setPercentProgress ] = useState(0);
  const audio = new Audio("https://lev-webdev-assets-123098.s3-ap-southeast-2.amazonaws.com/gunshot3.ogg");

  useEffect(() => {
    setPercentProgress((reps / maxReps) * 100);

    if (reps === maxReps) {
      audio.play();
    }
  }, [reps]);

  return (
    // &nbsp; are used to avoid fiddling around with padding creating some of the progress bar already "loaded"
    <div className="ProgressBar">
      <div 
        className="fill"
        style={{
          width: `${percentProgress}%`,
        }}
      >
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{name}</p>
      </div>
    </div>
  );
}

export default ProgressBar;
