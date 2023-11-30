import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

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

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1;

  const total = income + expense;

  const incomePercentage = total !== 0 ? (income / total) * 100 : 0;
  const expensePercentage = total !== 0 ? (expense / total) * 100 : 0;

  return (
    <div className="inc-exp-container mt-4 d-flex justify-content-center">
      <div className="text-center mr-4">
        <h4 className="mb-3">Income</h4>
        <p
          className="money plus font-weight-bold"
          data-toggle="tooltip"
          data-placement="top"
          title="Total income for the selected period"
        >
          {moneyFormatter(income)}
        </p>
        {total !== 0 && (
          <div className="progress mt-2">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${incomePercentage}%` }}
              aria-valuenow={incomePercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {incomePercentage.toFixed(2)}%
            </div>
          </div>
        )}
      </div>
      <div className="text-center">
        <h4 className="mb-3">Expense</h4>
        <p
          className="money minus font-weight-bold"
          data-toggle="tooltip"
          data-placement="top"
          title="Total expenses for the selected period"
        >
          {moneyFormatter(expense)}
        </p>
        {total !== 0 && (
          <div className="progress mt-2">
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: `${expensePercentage}%` }}
              aria-valuenow={expensePercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {expensePercentage.toFixed(2)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
