import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

const VOTE_CONTRACT_ADDR = "0xbFF54DEA53D243E35389e3f2C7F9c148b0113104"
const ETHERSCAN_IO = "https://goerli-optimism.etherscan.io/tx/"
const START_BLOCK = 2758972
import voteJson from "../res/Vote.json"


import { FullProof as groupFullProof} from "../prover/group/proof";
import { FullProof as signalFullProof} from "../prover/signal/proof";
function packToSolidityProof(proof) {
  return [
      proof.pi_a[0],
      proof.pi_a[1],
      proof.pi_b[0][1],
      proof.pi_b[0][0],
      proof.pi_b[1][1],
      proof.pi_b[1][0],
      proof.pi_c[0],
      proof.pi_c[1]
  ];
}
import { SolidityProof } from "@semaphore-protocol/proof"

import "@ethersproject/shims"
import { BigNumber, ethers } from 'ethers';
import { requestSnap } from './snap';
import { queryGroupMember } from './thegraph';

function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner(window.ethereum.selectedAddress)
  const voteContract = new ethers.Contract(VOTE_CONTRACT_ADDR, voteJson.abi, signer)
  return voteContract
}

let voteContract : ethers.Contract
if (typeof window !== `undefined`) {
  voteContract = getContract()
}

export const sendHello = async () => {
  return await requestSnap('hello')
};

export const updatePrivSeed = async (seedSeeq : string) => {
  const ethNode = await getBIP44()
  const deriveEthNodeddress = await getBIP44AddressKeyDeriver(ethNode);
  const addressKey = await deriveEthNodeddress(Number(seedSeeq)); // 0 is default walletAddress
  const res = await requestSnap('update_priv_seed', [addressKey.address.toString()])
  const storeSeed = await requestSnap('get_seed')
  const identityCommitment = await getIdentityCommitment()
  //window.alert("Seed now is \"" + storeSeed + "\" " + "commitment is \"" + identityCommitment + "\"")
  return res
};

export async function mint_nft(
  nft_contract : string
) {
  console.log("nft_contract : ", nft_contract)
  const NFT_ABI = [
    "function mint()"
  ]

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner(window.ethereum.selectedAddress)
  const nftContract = new ethers.Contract(nft_contract, NFT_ABI, signer)
  await nftContract.mint()
  window.alert("mint nft " + nft_contract + " done !")
}


export async function hasNFT(
  nft_contract : string
) {
  const NFT_ABI = [
    "function balanceOf(address owner) returns(uint256)"
  ]
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner(window.ethereum.selectedAddress)
  const nftContract = new ethers.Contract(nft_contract, NFT_ABI, signer)
  const has_nft = await nftContract.callStatic.balanceOf(window.ethereum.selectedAddress)
  console.log("has_nft : ", has_nft)
  return has_nft
}

export const getBIP44 = async () => {
    return await requestSnap('get_bip44')
};

export const getIdentityCommitment = async () => {
    return await requestSnap('get_identity_commitment')
};

export const getRC = async (rand : string) => {
    return await requestSnap('get_rc', [rand])
};

export const getGroupProof = async (rand : string, idcs : string[]) => {
    return await requestSnap('get_group_proof', [rand, idcs])
};

export const getSignalProof = async (rand : string, msg : string, externalNullifier : string) => {
    return await requestSnap('get_signal_proof', [rand, msg, externalNullifier])
};

const TREE_DEPTH = 10
export type GroupProps = {
    groupId : number;
    name : string;
    description : string;
    privacy : PRIVACY;
    icon : string;
    admin : string;
    members : string[];
    votes : string[];
    identityCommitment : string;
    asset : string;
}

export type GroupsProps = GroupProps[];

export const groupAdminInfo = async() => {
  let groups : GroupsProps = []
  const CUR_GROUP_ID = await voteContract.callStatic.GROUP_ID()
  const START_GROUP_ID = 27
  for (let id = START_GROUP_ID; id <= CUR_GROUP_ID; id++) {
    const onchainGroup = await voteContract.callStatic.groups(id)
    let group : GroupProps = {
      groupId : id,
      name : onchainGroup.name,
      description : onchainGroup.desc,
      icon : onchainGroup.icon,
      privacy : onchainGroup.privacy,
      admin : await voteContract.callStatic.admins(id),
      members : await queryGroupMember(id),
      votes : [],
      identityCommitment : await getIdentityCommitment() as string,
      asset : onchainGroup.asset
    }

    groups.push(group)
  }
  
  return groups
}

export const createGroup = async () => {
  window.alert("Start : Create Group ")
  // await window.ethereum.enable()
  let tx = await voteContract.createGroup(TREE_DEPTH, window.ethereum.selectedAddress)
  const group_id = await voteContract.callStatic.GROUP_ID()
  window.alert("Done : Create Group " + group_id + ", see " + ETHERSCAN_IO  + tx.hash)
}

export const createGroupExtra = async (
  name : string,
  description : string,
  privacy : string,
  icon : string
) => {
  window.alert("Start : Create Group ")
  // await window.ethereum.enable()
  let tx = await voteContract.CreateGroupExtra(
    TREE_DEPTH, window.ethereum.selectedAddress,
    name, description, privacy, icon
  )
  const group_id = await voteContract.callStatic.GROUP_ID()
  window.alert("Done : Create Group " + group_id + ", see " + ETHERSCAN_IO  + tx.hash)
}

export enum PRIVACY {
  ANYONE,     // any one can join
  NFT,        // could join group if owner of a NFT
  TOKEN       // could join group if owner of token
}
export const CreateGroupWithAssetDemand = async (
  name : string,
  description : string,
  privacy : PRIVACY,
  icon : string,
  asset : string
) => {
  window.alert("Start : Create Group ")
  let tx = await voteContract.CreateGroupWithAssetDemand(
    TREE_DEPTH, window.ethereum.selectedAddress,
    name, description, privacy, icon, asset
  )
  const group_id = await voteContract.callStatic.GROUP_ID()
  window.alert("Done : Create Group " + group_id + ", see " + ETHERSCAN_IO  + tx.hash)
}

export const JoinRequest = async (group_id : number) => {
  const identityCommitment = await getIdentityCommitment()
  window.alert("Start : Memeber " + identityCommitment + " Join Request in Group " + group_id)
  let tx = await voteContract.JoinRequest(group_id, identityCommitment, {gasLimit : 1000000})
  window.alert("Done : Memeber " + identityCommitment + " Join Request In  Group " + group_id + ", see " + ETHERSCAN_IO + tx.hash)
}

export const addMember = async (group_id : number, identityCommitment : string) => {
  //const identityCommitment = await getIdentityCommitment()
  window.alert("Start : add Memeber " + identityCommitment + " in Group " + group_id)
  let tx = await voteContract.addMember(group_id, identityCommitment, {gasLimit : 1000000})
  window.alert("Done : Add Memeber " + identityCommitment + " In  Group " + group_id + ", see " + ETHERSCAN_IO + tx.hash)
}

export const voteInGroup = async (group_id : number, msg : string) => {
  window.alert("Start : vote \"" + msg + "\" in Group " + group_id )

  const rand = Math.floor(Math.random() * 1000000).toString()
  const rc = await getRC(rand)

  const idcs = await queryGroupMember(group_id)

  const groupProof = await getGroupProof(rand, idcs) as groupFullProof
  const solidityGroupProof: SolidityProof = packToSolidityProof(groupProof.proof) as SolidityProof

  const externalNullifier = BigNumber.from(Math.floor(Math.random() * 1000000)).toBigInt()
  const signalProof = await getSignalProof(rand, msg, externalNullifier.toString()) as signalFullProof
  const soliditySignalProof : SolidityProof = packToSolidityProof(signalProof.proof) as SolidityProof

  window.alert("ZKP Generated!!! Start Verify on-chain ")

  const bytes32msg = ethers.utils.formatBytes32String(msg)
  let tx = await voteContract.vote(
    rc, group_id, solidityGroupProof,
    bytes32msg,
    signalProof.publicSignals.nullifierHash,
    externalNullifier,
    soliditySignalProof,
    {gasLimit : 10000000})
  
  window.alert("Done  : vote \"" + msg + "\" in Group " + group_id + ", see " + ETHERSCAN_IO + tx.hash)
}

