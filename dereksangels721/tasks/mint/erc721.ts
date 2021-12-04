import { task } from "hardhat/config";
import Arweave from "arweave";
import { readFileSync, readdirSync } from 'fs';
import * as path from 'path';


import {
  DereksAngels,
  DereksAngels__factory
} from "../../types";
import { env } from "process";
import { json } from "stream/consumers";

async function uploadToArweave(data: any, key: object, tags: Array<[string, string]>) {
  // Or to specify a gateway when running from NodeJS you might use
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  });

  const wallet = process.env.ARWEAVE_WALLET;
  
  let transactionA = await arweave.createTransaction({
    data: data
  }, JSON.parse(readFileSync('/Users/arein/Desktop/arweave_wallet_2.json', 'utf8'))); // TODO

  tags.forEach((tag) => {
    transactionA.addTag(tag[0], tag[1]);
  });

  await arweave.transactions.sign(transactionA, JSON.parse(readFileSync('/Users/arein/Desktop/arweave_wallet_2.json', 'utf8')));

  console.log(transactionA.id);
  
  let uploader = await arweave.transactions.getUploader(transactionA);

  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
  }

  return transactionA.id;
}

task("mint")
.addParam("mission", "The token mission")
.addParam("contractid", "The contract id mission")
.setAction(async function ({ mission, contractid }, { ethers }) {
  const tokenFactory: DereksAngels__factory = await ethers.getContractFactory("DereksAngels");

  const signerAddress = await tokenFactory.signer.getAddress();
  const signer = await ethers.getSigner(signerAddress);

  const contract = new ethers.Contract(contractid, DereksAngels__factory.abi, signer);

  const arweaveWallet = JSON.parse(readFileSync(process.env.ARWEAVE_WALLET!, 'utf8'));
  const imageTransactionid = await uploadToArweave(readFileSync('/Users/arein/Desktop/Love.png'), arweaveWallet, [["Content-Type", "image/png"]]);
  const imageUrl = `https://arweave.net/${imageTransactionid}`;

  console.log('Find the image at', imageUrl);
  const metadata = {
    "description": "Angel of " + mission, 
    // "external_url": "https://openseacreatures.io/3", 
    "image": imageUrl, 
    "name": mission,
    //"attributes": [ ... ], 
  };

  const metadataTransactionId = await uploadToArweave(JSON.stringify(metadata), arweaveWallet, []);
  
  // Token gets created
  // metadataUrl is the url returend by IPFS above
  const transaction = await contract.drop('0xf3ea39310011333095CFCcCc7c4Ad74034CABA63', [mission], [`ar://${metadataTransactionId}`]);
  await transaction.wait();
  console.log(transaction);
});

task("mintfolder")
.addParam("folder", "The folder with intents")
.addParam("contractid", "The contract id")
.setAction(async function ({ folder, contractid }, { ethers }) {
  const tokenFactory: DereksAngels__factory = await ethers.getContractFactory("DereksAngels");

  const signerAddress = await tokenFactory.signer.getAddress();
  const signer = await ethers.getSigner(signerAddress);

  const contract = new ethers.Contract(contractid, DereksAngels__factory.abi, signer);

  const intents = readdirSync(folder);

  const contractMissions: string[] = [];
  const contractMetadatas: string[] = [];
  const promises: Promise<any>[] = [];
  await Promise.all(intents.map(async (intent) => {
    const arweaveWallet = JSON.parse(readFileSync(process.env.ARWEAVE_WALLET!, 'utf8'));
    const imageTransactionid = await uploadToArweave(readFileSync(path.join(folder, intent)), arweaveWallet, [["Content-Type", "image/png"]]);
    const imageUrl = `https://arweave.net/${imageTransactionid}`;
  
    console.log('Find the image at', imageUrl);
    const metadata = {
      "description": "Angel of " + intent.replace('.png', ''), 
      // "external_url": "https://openseacreatures.io/3", 
      "image": imageUrl, 
      "name": intent.replace('.png', ''),
      //"attributes": [ ... ], 
    };
  
    const metadataTransactionId = await uploadToArweave(JSON.stringify(metadata), arweaveWallet, []);

    contractMissions.push(intent.replace('.png', ''));
    contractMetadatas.push(`ar://${metadataTransactionId}`);
  }));
  

  // Token gets created
  // metadataUrl is the url returend by IPFS above
  console.log("Missions");
  console.log(contractMissions);
  const transaction = await contract.drop('0xf3ea39310011333095CFCcCc7c4Ad74034CABA63', contractMissions, contractMetadatas);
  await transaction.wait();
  console.log(transaction);
});
