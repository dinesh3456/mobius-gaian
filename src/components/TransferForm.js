import React, { useState } from 'react';

const TransferForm = ({ transferTokens }) => {
  const [toAddress, setToAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  const handleTransfer = () => {
    transferTokens(toAddress, tokenAmount);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="To Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token Amount"
        value={tokenAmount}
        onChange={(e) => setTokenAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer Tokens</button>
    </div>
  );
};

export default TransferForm;
