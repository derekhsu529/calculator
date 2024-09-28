import React from 'react';
import './History.css';

const History = ({ history, onDelete }) => {
  return (
    <div className="history">
      <h2>历史记录</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry}
            <button className="delete-btn" onClick={() => onDelete(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;