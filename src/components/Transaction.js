import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

function moneyFormatter(num) {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(num);

  return formattedAmount;
}

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={`list-group-item ${transaction.amount < 0 ? 'list-group-item-danger' : 'list-group-item-success'}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {transaction.text}
        </div>
        <div>
          <span>{sign}{moneyFormatter(transaction.amount)}</span>
          <button onClick={() => deleteTransaction(transaction.id)} className="btn btn-danger ml-2">
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};
