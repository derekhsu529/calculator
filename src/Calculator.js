import React, { useState } from 'react';
import Display from './Display';
import Buttons from './Buttons';
import History from './History';
import './Calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [pendingValue, setPendingValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [calculation, setCalculation] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const updateDisplay = (value) => {
    setDisplayValue(value);
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setPendingValue(null);
    setOperator(null);
    setCalculation('');
  };

  const inputNumber = (number) => {
    if (displayValue === '0' || operator) {
      updateDisplay(String(number));
      setCalculation((prevCalculation) => prevCalculation.trim() + String(number));
    } else {
      updateDisplay(displayValue + String(number));
      setCalculation((prevCalculation) => prevCalculation + String(number));
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
    setCalculation(displayValue + ' ' + op + ' ');
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      updateDisplay(displayValue + '.');
      setCalculation(calculation + '.');
    }
  };

  const calculateResult = () => {
    if (operator && pendingValue !== null) {
      const result = calculate(pendingValue, parseFloat(displayValue), operator);
      updateDisplay(String(result));
      setPendingValue(null);
      setOperator(null);
      const fullCalculation = calculation + displayValue + ' = ' + result;
      setCalculation(fullCalculation);
      updateHistory(fullCalculation);
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
    const newValue = String(parseFloat(displayValue) * -1);
    updateDisplay(newValue);
    setCalculation(calculation + ' ± ');
  };

  const inputPercent = () => {
    const newValue = String(parseFloat(displayValue) / 100);
    updateDisplay(newValue);
    setCalculation(calculation + ' % ');
  };

  const updateHistory = (entry) => {
    setHistory((prevHistory) => {
      const newHistory = [entry, ...prevHistory];
      return newHistory.slice(0, 5);
    });
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const deleteHistoryItem = (index) => {
    setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
  };

  const handleButtonClick = (label) => {
    switch (label) {
      case 'C':
        clearDisplay();
        break;
      case '±':
        toggleSign();
        break;
      case '%':
        inputPercent();
        break;
      case '÷':
      case '×':
      case '-':
      case '+':
        inputOperator(label);
        break;
      case '=':
        calculateResult();
        break;
      case '.':
        inputDecimal();
        break;
      default:
        inputNumber(label);
        break;
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display calculation={calculation} displayValue={displayValue} />
        <Buttons onClick={handleButtonClick} />
      </div>
      <div className="history-container">
        <button className="btn history" onClick={toggleHistory}>历史</button>
        {showHistory && <History history={history} onDelete={deleteHistoryItem} />}
      </div>
    </div>
  );
};

export default Calculator;