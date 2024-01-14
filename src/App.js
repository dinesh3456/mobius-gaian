import "./App.css";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "./components/NavBar";
import TransferForm from "./components/TransferForm";
import contractABI from "./contracts/contractABI.json";
import contractBytecode from "./contracts/contractBytecode";

const App = () => {
  //const [provider, setProvider] = useState(null);
  //const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState(null);

  useEffect(() => {
    // Initialize Ethereum provider and signer
    const initializeEthereum = async () => {
      if (window.ethereum) {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        const newSigner = newProvider.getSigner();
        //setProvider(newProvider);
        //setSigner(newSigner);

        // You'll need to replace 'YourContractABI' and 'YourContractBytecode' with your actual ABI and Bytecode
        const newContract = new ethers.ContractFactory(
          contractABI,
          contractBytecode,
          newSigner
        );
        setContract(newContract);
      }
    };

    initializeEthereum();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setConnectedAccount(accounts[0]);
        console.log(accounts);
      } catch (err) {
        console.log("Error connecting to the wallet", err);
      }
    }
  };

  const transferTokens = async (toAddress, token) => {
    try {
      const transaction = await contract.transfer(toAddress, token);
      await transaction.wait();
      console.log(`${token} tokens successfully transferred to ${toAddress}`);
    } catch (err) {
      console.log("Error transferring tokens:", err);
    }
  };

  return (
    <div>
      <Navbar connectWallet={connectWallet} />
      {connectedAccount && (
        <div>
          <h3>Connected Account: {connectedAccount}</h3>
        </div>
      )}
      <TransferForm transferTokens={transferTokens} />
    </div>
  );
};
export default App;
