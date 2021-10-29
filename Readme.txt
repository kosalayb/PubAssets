This prototype was implemented and tested in windows enviornment.

Steps:

1. clone the repo to your local folder (eg, cryptoAssets) and deploy the dapp successfully
//deploye the smart contract on ganache
  - open ganache HTTP://127.0.0.1:8545
  - change the port number(8545) on truffle-config.js
  - migrate the contract, .../cryptoAssets> truffle migrate --reset
  - copy the smart contract deplyeed address and change it on server.js (contractAddress)
  -save all
  
//run node server
2. open windows power shell, go to the folder c:/.../cryptoAssets
3. open node server. cryptoAssets> node app.js

//creating and manipulating assets
4. create assets using http://localhost:3000/admin
5. Assets manipulation using http://localhost:3000/client

Please note- only admin can create/delete assets





IPFS supporting infomation:

URI to view the message connected from fileHash is as follows:
https://gateway.ipfs.io/ipfs/${fileHash}
Example, https://gateway.ipfs.io/ipfs/QmdtfayHRcUzeZjfVYdm9ZshfzagbWEoeJYbWiE6FiqAFN
