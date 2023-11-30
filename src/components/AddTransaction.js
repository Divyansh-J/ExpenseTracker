import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const { addTransaction } = useContext(GlobalContext);

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (text.trim() === '' || isNaN(amount) || +amount === 0) {
      alert('Please enter valid values for both text and amount.');
      return;
    }

    // Create new transaction
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      date: new Date().toISOString(),
    };

    // Add the transaction
    addTransaction(newTransaction);

    // Clear the form
    setText('');
    setAmount('');
  };

  return (
    <div className="add-transaction-container mt-4">
      <h3 className="text-center mb-4">Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Add Transaction
        </button>
      </form>
    </div>
  );
};
