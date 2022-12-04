# Workflow

```mermaid
sequenceDiagram
	participant U 	as User
	participant F 	as Frontend
	participant M 	as Metamask(Snap)
	participant VC 	as Vote-Contract
	participant NC 	as NFT-Contract
	
  U -->> F : click "connect"
  F -->> M : install snap to metamask

  U -->> F : click "Create Group (name, desc, icon asset(nft/token) request, asset address)"
  F -->> VC : Create Group Tx
  VC -->> F : Group ID

  U -->> F : click "Join Group"
	rect rgba(0, 220, 220, .3)
    M -->> F : generate identity
  end
  F -->> VC : "add member(identity)" in group
  VC -->> NC : check asset demand

  U -->> F : Click "Create Poll" in Group g with Msgs [msg1, msg2, ...]
  F -->> VC : createPollInGroup(groupId, Msgs[])

  U -->> F : Click "Vote" with "Msg m" In "Group g Pool p"
  F -->> M : run snarkjs prove zkp
	rect rgba(0, 220, 220, .3)
    M -->> M : generate identity
    M -->> M : generate rc
    M -->> M : generate Group Proof, with "Group Merkle Proof"
    M -->> M : generate Signal Proof 
  end
  F -->> VC : votePollInGroup(rc, msg, groupId, pollId, group proof, signal proof)
  VC -->> VC : check msg valid in Pool
  VC -->> VC : verify zkp proof
  F -->> VC : check "Vote Stats"

```

# Setup Snap
```shell
  git clone https://github.com/samzkback/zkvoteLegacy.git
  nvm use
  yarn install
  cd packages/snap/
  yarn build:snap;yarn start
```

# The Graph
https://api.thegraph.com/subgraphs/name/samzkback/zkvotev2  
ID : QmbZYif3cTafHB7AZrtNf9odeb49HVU4aEu1VZUNsbkLo8
