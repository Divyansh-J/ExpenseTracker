import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);

  // Calculate total balance
  const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  // Handle delete transaction
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  // Money formatter function
  function moneyFormatter(num) {
    let p = num.toFixed(2).split('.');
    return (
      '₹ ' +
      p[0]
        .split('')
        .reverse()
        .reduce(function (acc, num, i, orig) {
          return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
        }, '') +
      '.' +
      p[1]
    );
  }

  return (
    <div className="history-container mt-4">
      <h3 className="text-center mb-4">Transaction History</h3>
      <div className="total-balance text-center mb-3">
        <h5 className="text-uppercase mb-2">Total Balance</h5>
        <p className={`font-weight-bold h4 ${totalBalance >= 0 ? 'text-success' : 'text-danger'}`}>
          {moneyFormatter(totalBalance)}
        </p>
      </div>
      <ul className="list-group">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`list-group-item ${
              transaction.amount < 0 ? 'list-group-item-danger' : 'list-group-item-success'
            } d-flex justify-content-between align-items-center`}
          >
            <div>
              <strong>{transaction.text}</strong>
              <p className="mb-0">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
            <div>
              <span
                className={`badge ${
                  transaction.amount < 0 ? 'badge-danger' : 'badge-success'
                } badge-pill mr-2`}
              >
                {transaction.amount < 0 ? '-' : '+'}
                {moneyFormatter(Math.abs(transaction.amount))}
              </span>
              <button
                onClick={() => handleDelete(transaction.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
