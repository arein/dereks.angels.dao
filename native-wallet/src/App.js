import './App.css';

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import React from 'react';
import abi from './abi';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "1c96603e022b4d97a08b70a95afae845"
    }
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: "pk_live_25EF4591AD77C3F5"
    }
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  providerOptions,
  theme: "dark"
});

function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [provider, setProvider] = React.useState(null);
  const disconnectWallet = (() => {
    console.log("Killing the wallet connection", provider);
    if (provider.close) {
      provider.close().then(() => {
        // If the cached provider is not cleared,
        // WalletConnect will default to the existing session
        // and does not allow to re-scan the QR code with a new wallet.
        // Depending on your use case you may want or want not his behavir.
        web3Modal.clearCachedProvider();
        setProvider(null);
        setIsConnected(false);
      });
    } else {
      web3Modal.clearCachedProvider();
      setProvider(null);
      setIsConnected(false);
    }
  
    //selectedAccount = null;
  });
  const connectWallet = (() => {
    if (web3Modal.cachedProvider) {
      web3Modal.clearCachedProvider();
    }
    web3Modal.connect().then((provider) => {
      setProvider(provider);
      const web3 = new Web3(provider);
      setIsConnected(true);
      const tokenInst = new web3.eth.Contract(abi, '0x7f6fECB0D79fC1B325ae064788bf3c0e6dE8e35B');
      web3.eth.getAccounts().then((accs) => {
        const selectedAccount = accs[0];
        tokenInst.methods.balanceOf(selectedAccount).call().then((result) => {
          setBalance(result/1000000);
        });
      });
      // TODO: Verify wallet ownership

    });
  });
  return (
    <div className="App">
      {!isConnected &&
      <button onClick={connectWallet}>
        Connect Wallet
      </button>
      }
    {isConnected &&
      <button onClick={disconnectWallet}>
        Disconnect Wallet
      </button>
      }
      {isConnected && balance >= 1 &&
        <div>
          <span>Congrats. You own {balance} DRKSANGLZ. Get your Apple Wallet pass.</span>
          <button onClick={connectWallet}>
            Get your Apple Wallet Card
          </button>
        </div>
      }

      {isConnected && balance < 1 &&
        <span>Sorry babe you dont own enough tokenz (You own {balance} DRKSANGLZ).</span>
      }
    </div>
  );
}

export default App;