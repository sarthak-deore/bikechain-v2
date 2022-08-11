import React, { useState } from "react";
import Config from "../config.json";
import { ethers } from "ethers";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BlockChainContext = React.createContext("");

export const BlockChainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [renterExists, setRenterExists] = useState();
  const [renter, setRenter] = useState();

  const [renterBalance, setRenterBalance] = useState();
  const [due, setDue] = useState();
  const [duration, setDuration] = useState();
  const [isOwner, setIsOwner] = useState();
  const [ownerBalance, setOwnerBalance] = useState();

  const signer = provider.getSigner();

  const address = Config.contractAddress;
  const abi = Config.contractAbi;
  const contract = new ethers.Contract(address, abi, signer);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Metamask not installed");
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object!");
    }
  };

  const checkWalletConnected = async () => {
    try {
      if (!window.ethereum) return alert("Metamask not installed");
      const accounts = await provider.send("eth_accounts", []);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const balance = await contract.balanceOf();
      const newBal = ethers.utils.formatEther(balance);
      setBalance(newBal);
    } catch (error) {
      console.log(error);
    }
  };

  const getOwnerBalance = async () => {
    try {
      const balance = await contract.getOwnerBalance();
      const newBal = ethers.utils.formatEther(balance);
      setOwnerBalance(newBal);
    } catch (error) {
      console.log(error);
    }
  };

  const checkRenterExists = async () => {
    try {
      if (currentAccount) {
        const renter = await contract.renterExists(currentAccount);

        setRenterExists(renter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRenter = async () => {
    try {
      if (currentAccount) {
        const renter = await contract.getRenter(currentAccount);
        setRenter(renter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addRenter = async (
    walletAddress,
    firstName,
    lastName,
    canRent,
    active,
    balance,
    due,
    start,
    end
  ) => {
    try {
      const addNewRenter = await contract.addRenter(
        walletAddress,
        firstName,
        lastName,
        canRent,
        active,
        balance,
        due,
        start,
        end
      );
      await addNewRenter.wait();
      await checkRenterExists();
    } catch (error) {
      toast.error("Please connect your wallet!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getRenterBalance = async () => {
    try {
      if (currentAccount) {
        const balance = await contract.balanceOfRenter(currentAccount);
        setRenterBalance(ethers.utils.formatEther(balance));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deposit = async (value) => {
    try {
      const bnbValue = ethers.utils.parseEther(value);
      const deposit = await contract.deposit(currentAccount, {
        value: bnbValue,
      });
      await deposit.wait();
      await getRenterBalance();
    } catch (error) {
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getDue = async () => {
    try {
      if (currentAccount) {
        const due = await contract.getDue(currentAccount);
        setDue(ethers.utils.formatEther(due));
        await getRenter();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalDuration = async () => {
    try {
      if (currentAccount) {
        const totalDuration = await contract.getTotalDuration(currentAccount);
        setDuration(Number(totalDuration));
        await getRenter();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async (value) => {
    try {
      const bnbValue = ethers.utils.parseEther(value);
      const deposit = await contract.makePayment(currentAccount, bnbValue);

      await deposit.wait();

      await getRenter();
      await checkRenterExists();
      await getRenterBalance();
      await getTotalDuration();
      await getDue();
    } catch (error) {
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkOut = async () => {
    try {
      if (currentAccount) {
        const checkOut = await contract.checkOut(currentAccount);
        await checkOut.wait();
        await getRenter();
      }
    } catch (error) {
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkIn = async () => {
    try {
      if (currentAccount) {
        const checkIn = await contract.checkIn(currentAccount);
        await checkIn.wait();
        await getRenter();
        await getDue();
        await getTotalDuration();
      }
    } catch (error) {
      toast.error(error.reason, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkOwner = async () => {
    try {
      if (currentAccount) {
        const isOwner = await contract.checkOwner(currentAccount);
        setIsOwner(isOwner);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawToOwner = async () => {
    try {
      if (isOwner) {
        const withdraw = await contract.withdrawOwnerBalance();
        await withdraw.wait();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkWalletConnected();
    checkRenterExists();
    getRenter();
    getRenterBalance();
    getDue();
    getTotalDuration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount]);

  return (
    <BlockChainContext.Provider
      value={{
        connectWallet,
        renter,
        getRenter,
        currentAccount,
        renterExists,
        addRenter,
        checkRenterExists,
        renterBalance,
        deposit,
        due,
        duration,
        makePayment,
        checkIn,
        checkOut,
        isOwner,
        checkOwner,
        getBalance,
        balance,
        getOwnerBalance,
        ownerBalance,
        withdrawToOwner,
      }}
    >
      {children}
    </BlockChainContext.Provider>
  );
};
