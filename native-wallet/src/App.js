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

const endpoint = 'https://rzod2384ab.execute-api.us-east-1.amazonaws.com';

function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [provider, setProvider] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const [selectedAccount, setSelectedAccount] = React.useState(null);
  const [nonce, setNonce] = React.useState(null);

  // Prepending with safari forces to open link in Safari
  const isIphone = navigator.userAgent.toLowerCase().includes('iphone');
  const passUrl = `${endpoint}/serverless_lambda_stage/generate?wallet=${selectedAccount}&nonce=${nonce}`;
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
  
    setSelectedAccount(null);
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
        setSelectedAccount(selectedAccount);
        tokenInst.methods.balanceOf(selectedAccount).call().then((result) => {
          setBalance(parseInt(result/1000000));
        });
      });
    });
  });
  const getWalletPass = () => {
    web3.eth.personal.sign(`I own ${balance} tokens`, selectedAccount).then((nonce) => {
      setNonce(nonce);
    });
  };
  const openLink = () => {
    window.open(passUrl, "_self");
  };
  const metamaskUrl = 'https://metamask.app.link/dapp/' + window.location.href.replace('https://', '');
  return (
    <div className="App">
      <img width="400" src="https://arweave.net/p5Fu6gXNiS-utxgWQ4vhuXJTART3KEIdtmEsT-FPvvg" alt="Derek's Angels" />
      {!isIphone &&
        <div>
          <span>WARNING: You're not on an iPhone. This app only works on iPhones :(</span>
          <br/>
        </div>
      }
      {!isConnected &&
      <div>
        <h1>Want to connect with us in Meatspace?</h1>
        <h3>If you own $DRKSANGLZ you can use this app to create your Apple Wallet pass to unlock our world</h3>
      </div>
      }
      {!isConnected &&
      <div><button onClick={connectWallet}>
        Connect Wallet
      </button>
      <br/>
      <a target="_blank" rel="noreferrer" href={metamaskUrl}>
        Open in Metamask Mobile Wallet
      </a>
      </div>
      }
    {isConnected &&
      <button onClick={disconnectWallet}>
        Disconnect Wallet
      </button>
      }
      {isConnected && balance >= 1 && !nonce &&
        <div>
          <span>Congrats. You own {balance} DRKSANGLZ. Get your Apple Wallet pass.</span>
          <br/>
          <button onClick={getWalletPass}>
            Get your Apple Wallet Card
          </button>
        </div>
      }

      {isConnected && balance >= 1 && nonce &&
        <div>
          <a target="_blank" rel="noreferrer" href={passUrl}>
            Download Pass
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

