import React from 'react';
import './Buttons.css';

const Buttons = ({ onClick }) => {
  const buttons = [
    { label: 'C', className: 'clear' },
    { label: '±', className: '' },
    { label: '%', className: '' },
    { label: '÷', className: 'operator' },
    { label: '7', className: '' },
    { label: '8', className: '' },
    { label: '9', className: '' },
    { label: '×', className: 'operator' },
    { label: '4', className: '' },
    { label: '5', className: '' },
    { label: '6', className: '' },
    { label: '-', className: 'operator' },
    { label: '1', className: '' },
    { label: '2', className: '' },
    { label: '3', className: '' },
    { label: '+', className: 'operator' },
    { label: '0', className: 'zero' },
    { label: '.', className: '' },
    { label: '=', className: 'equal' }
  ];

  return (
    <div className="buttons">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`btn ${button.className}`}
          onClick={() => onClick(button.label)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default Buttons;