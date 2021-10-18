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

const passUrl = 'https://czvicq0j5k.execute-api.us-east-1.amazonaws.com/serverless_lambda_stage/generate?wallet=abc&nonce=true';

function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [provider, setProvider] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
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
      setWeb3(web3);
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
  const getWalletPass = () => {
    web3.personal.sign(web3.fromUtf8("Hello from Toptal!"), web3.eth.coinbase, console.log);
  };
  const metamaskUrl = 'https://metamask.app.link/dapp/' + window.location.href.replace('https://', '');
  return (
    <div className="App">
      {!isConnected &&
      <div><button onClick={connectWallet}>
        Connect Wallet
      </button>
      <a target="_blank" href={metamaskUrl}>
        Open in Metamask Mobile Wallet
      </a>
      </div>
      }
    {isConnected &&
      <button onClick={disconnectWallet}>
        Disconnect Wallet
      </button>
      }
      {isConnected && balance >= 1 &&
        <div>
          <span>Congrats. You own {balance} DRKSANGLZ. Get your Apple Wallet pass.</span>
          <button onClick={getWalletPass}>
            Get your Apple Wallet Card
          </button>
          <a target="_blank" href={passUrl}>
            PassUrl
          </a>
        </div>
      }

      {isConnected && balance < 1 &&
        <span>Sorry babe you dont own enough tokenz (You own {balance} DRKSANGLZ).</span>
      }
    </div>
  );
}

export default App;
