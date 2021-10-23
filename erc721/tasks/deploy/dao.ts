import { task } from "hardhat/config";
import { getExpectedContractAddress } from "../utils";

import {
  DereksAngels,
  DereksAngels__factory,
  DereksAngelsGovernor,
  DereksAngelsGovernor__factory,
  Timelock,
  Timelock__factory,
} from "../../types";

task("deploy:Dao").setAction(async function (_, { ethers }) {
  const timelockDelay = 2;

  const tokenFactory: DereksAngels__factory = await ethers.getContractFactory("DereksAngels");

  const signerAddress = await tokenFactory.signer.getAddress();
  const signer = await ethers.getSigner(signerAddress);

  const governorExpectedAddress = await getExpectedContractAddress(signer);

  const token: DereksAngels = <DereksAngels>await tokenFactory.deploy();
  await token.deployed();

  const timelockFactory: Timelock__factory = await ethers.getContractFactory("Timelock");
  const timelock: Timelock = <Timelock>await timelockFactory.deploy(governorExpectedAddress, timelockDelay);
  await timelock.deployed();

  const governorFactory: DereksAngelsGovernor__factory = await ethers.getContractFactory("DereksAngelsGovernor");
  const governor: DereksAngelsGovernor = <DereksAngelsGovernor>(
    await governorFactory.deploy(token.address, timelock.address)
  );
  await governor.deployed();

  console.log("Dao deployed to: ", {
    governorExpectedAddress,
    governor: governor.address,
    timelock: timelock.address,
    token: token.address,
  });
});
