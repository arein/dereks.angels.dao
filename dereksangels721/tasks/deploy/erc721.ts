import { task } from "hardhat/config";
import { getExpectedContractAddress } from "../utils";

import {
  DereksAngels,
  DereksAngels__factory
} from "../../types";

task("deploy").setAction(async function (_, { ethers }) {
  const tokenFactory: DereksAngels__factory = await ethers.getContractFactory("DereksAngels");

  const signerAddress = await tokenFactory.signer.getAddress();
  const signer = await ethers.getSigner(signerAddress);

  const token: DereksAngels = <DereksAngels>await tokenFactory.deploy();
  await token.deployed();

  console.log("ERC721 deployed to: ", {
    token: token.address,
  });
});
