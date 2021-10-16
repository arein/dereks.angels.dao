import './App.css';

import Web3 from "web3";
import Web3Modal from "web3modal";
import React from 'react';

const providerOptions = {
  /* See Provider Options Section */
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  }
];


function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const connectWallet = (() => {
    web3Modal.connect().then((provider) => {
      console.log("connected");
      const web3 = new Web3(provider);
      setIsConnected(true);
      console.log(web3);
      const tokenInst = new web3.eth.Contract(abi, '0x7f6fECB0D79fC1B325ae064788bf3c0e6dE8e35B');
      console.log(tokenInst);
      console.log(web3.eth.accounts[0]);
      console.log(web3.eth);
      // TODO: Verify wallet ownership
      web3.eth.sign(web3.currentProvider.selectedAddress, web3.utils.sha3('test'), function (err, signature) {
        if (err) {
          console.log(err);
          return;
        }
        tokenInst.methods.balanceOf(web3.currentProvider.selectedAddress).call().then((result) => {
          setBalance(result/1000000);
        });
      });
    });
  });
  console.log(isConnected);
  return (
    <div className="App">
      {!isConnected &&
      <button onClick={connectWallet}>
        Connect Wallet
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
        <span>Sorry babe you dont own enough tokenz.</span>
      }
    </div>
  );
}

export default App;
