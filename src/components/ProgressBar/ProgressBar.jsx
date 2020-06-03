import React, { useEffect, useState } from 'react';

function ProgressBar({ maxReps, name, reps }) {
  const [ percentProgress, setPercentProgress ] = useState(0);
  
  useEffect(() => {
    setPercentProgress((reps / maxReps) * 100);
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
        <p>&nbsp;&nbsp;&nbsp;{name}</p>
      </div>
    </div>
  );
}

export default ProgressBar;
