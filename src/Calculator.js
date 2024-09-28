import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [pendingValue, setPendingValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [calculation, setCalculation] = useState(''); // 新增状态变量
  const [history, setHistory] = useState([]); // 新增历史状态变量
  const [showHistory, setShowHistory] = useState(false); // 控制历史显示

  const updateDisplay = (value) => {
    setDisplayValue(value);
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setPendingValue(null);
    setOperator(null);
    setCalculation(''); // 清空计算过程
  };

  const inputNumber = (number) => {
    if (displayValue === '0') {
      updateDisplay(String(number));
    } else {
      updateDisplay(displayValue + String(number));
    }
    setCalculation(calculation + String(number)); // 更新计算过程
  };

  const inputOperator = (op) => {
    if (pendingValue === null) {
      setPendingValue(parseFloat(displayValue));
    } else if (operator) {
      setPendingValue(calculate(pendingValue, parseFloat(displayValue), operator));
    }
    updateDisplay('0');
    setOperator(op);
    setCalculation(calculation + ' ' + op + ' '); // 更新计算过程
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      updateDisplay(displayValue + '.');
      setCalculation(calculation + '.'); // 更新计算过程
    }
  };

  const calculateResult = () => {
    if (operator && pendingValue !== null) {
      const result = calculate(pendingValue, parseFloat(displayValue), operator);
      updateDisplay(String(result));
      setPendingValue(null);
      setOperator(null);
      const fullCalculation = calculation + ' = ' + result;
      setCalculation(fullCalculation); // 更新计算过程
      updateHistory(fullCalculation); // 更新历史记录
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
    setCalculation(calculation + ' ± '); // 更新计算过程
  };

  const inputPercent = () => {
    const newValue = String(parseFloat(displayValue) / 100);
    updateDisplay(newValue);
    setCalculation(calculation + ' % '); // 更新计算过程
  };

  const updateHistory = (entry) => {
    setHistory((prevHistory) => {
      const newHistory = [entry, ...prevHistory];
      return newHistory.slice(0, 5); // 只保留最近5次计算
    });
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="calculation">{calculation}</div> {/* 显示计算过程 */}
        <div className="result">{displayValue}</div> {/* 显示结果 */}
      </div>
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
        <button className="btn history" onClick={toggleHistory}>历史</button> {/* 新增历史按钮 */}
      </div>
      {showHistory && (
        <div className="history">
          <h2>历史记录</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;