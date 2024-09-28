import React from 'react';
import './Display.css';

const Display = ({ calculation, displayValue }) => {
  return (
    <div className="display">
      <div className="calculation">{calculation}</div>
      <div className="result">{displayValue}</div>
    </div>
  );
};

export default Display;