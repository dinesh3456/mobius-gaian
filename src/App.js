import "./App.css";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "./components/NavBar";
import TransferForm from "./components/TransferForm";
import contractABI from "./contractFiles/contractABI.json";
import contractBytecode from "./contractFiles/contractBytecode";

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
        const newContract = new ethers.Contract(
          "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          contractABI,
          newSigner
        );
        console.log("HERE IS THE CONTRACT ADDRESSS", newContract);

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
      // Get the current gas price from the provider
      const gasPrice = await contract.provider.getGasPrice();

      // Increase the gas price by a certain factor (e.g., 1.5 for a 50% increase)
      const increasedGasPrice = gasPrice
        .mul(ethers.BigNumber.from("15"))
        .div(ethers.BigNumber.from("10"));

      // Send the transaction with the increased gas price
      const transaction = await contract.TransferToken(toAddress, token, {
        gasPrice: increasedGasPrice,
      });

      await transaction.wait();
      console.log(`${token} tokens successfully transferred to ${toAddress}`);

      const balance = await contract.balanceOf(connectedAccount);
      console.log(`Token balance in MetaMask: ${balance.toString()}`);
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
