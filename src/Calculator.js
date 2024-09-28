import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [pendingValue, setPendingValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const updateDisplay = (value) => {
    setDisplayValue(value);
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setPendingValue(null);
    setOperator(null);
  };

  const inputNumber = (number) => {
    if (displayValue === '0') {
      updateDisplay(String(number));
    } else {
      updateDisplay(displayValue + String(number));
    }
  };

  const inputOperator = (op) => {
    if (pendingValue === null) {
      setPendingValue(parseFloat(displayValue));
    } else if (operator) {
      setPendingValue(calculate(pendingValue, parseFloat(displayValue), operator));
    }
    updateDisplay('0');
    setOperator(op);
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      updateDisplay(displayValue + '.');
    }
  };

  const calculateResult = () => {
    if (operator && pendingValue !== null) {
      updateDisplay(String(calculate(pendingValue, parseFloat(displayValue), operator)));
      setPendingValue(null);
      setOperator(null);
    }
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      case '%':
        return a % b;
      default:
        return b;
    }
  };

  const toggleSign = () => {
    updateDisplay(String(parseFloat(displayValue) * -1));
  };

  const inputPercent = () => {
    updateDisplay(String(parseFloat(displayValue) / 100));
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <button className="btn clear" onClick={clearDisplay}>C</button>
        <button className="btn" onClick={toggleSign}>±</button>
        <button className="btn" onClick={inputPercent}>%</button>
        <button className="btn operator" onClick={() => inputOperator('/')}>÷</button>
        <button className="btn" onClick={() => inputNumber(7)}>7</button>
        <button className="btn" onClick={() => inputNumber(8)}>8</button>
        <button className="btn" onClick={() => inputNumber(9)}>9</button>
        <button className="btn operator" onClick={() => inputOperator('*')}>×</button>
        <button className="btn" onClick={() => inputNumber(4)}>4</button>
        <button className="btn" onClick={() => inputNumber(5)}>5</button>
        <button className="btn" onClick={() => inputNumber(6)}>6</button>
        <button className="btn operator" onClick={() => inputOperator('-')}>-</button>
        <button className="btn" onClick={() => inputNumber(1)}>1</button>
        <button className="btn" onClick={() => inputNumber(2)}>2</button>
        <button className="btn" onClick={() => inputNumber(3)}>3</button>
        <button className="btn operator" onClick={() => inputOperator('+')}>+</button>
        <button className="btn zero" onClick={() => inputNumber(0)}>0</button>
        <button className="btn" onClick={inputDecimal}>.</button>
        <button className="btn equal" onClick={calculateResult}>=</button>
      </div>
    </div>
  );
};

export default Calculator;