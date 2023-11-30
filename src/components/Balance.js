import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

function moneyFormatter(num) {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(num);

  return formattedAmount;
}

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4 className="card-title">Your Balance</h4>
        <h1 className={`card-text ${total >= 0 ? 'text-success' : 'text-danger'}`}>
          {moneyFormatter(total)}
        </h1>
      </div>
    </div>
  );
};
