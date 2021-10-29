//Minting is defined as the computer process of validating information, 
//creating a new block and recording that information into the blockchain.

//install mocha and chai - https://mochajs.org/ - https://www.chaijs.com/
//npm install --save mocha
//npm i chai chai-as-promised -- save , $ npm install chai --save

const MyAsset = artifacts.require('./MyAsset.sol')

require('chai')
	.use(require('chai-as-promised'))
	.should()



contract('MyAsset', (accounts) => {

	let contract

	before(async()=>{
		contract = await MyAsset.deployed();
	})



	describe('deployment', async()=>{ // this is the container for deployment tests

		it('deployes successfully', async ()=>{
			const address = contract.address
			console.log(address)
			assert.notEqual(address,0x0)
			assert.notEqual(address,'')
			assert.notEqual(address,null)
			assert.notEqual(address,undefined)
		})

		it('has a name', async() => {
			const name = await contract.name()
			assert.equal(name,'PublicAsset')

		})


		it('has a symbol', async() => {
			const symbol = await contract.symbol()
			assert.equal(symbol,'PA')
			
		})

	})



	describe('minting', async()=>{ //container for minting tests

		it('creates a new token', async()=>{
			await contract.creatAsset("uri1");
			await contract.creatAsset("uri2");
			var result = await contract.creatAsset("uri3");
			//console.log(result);
			const event = result.logs[0].args;
			console.log(event);
			console.log("token id :",event.tokenId.toNumber());

			//success
			// console.log("total supply :"+totalSupply);
			// assert.equal(totalSupply,0);
		})

		it('get uri of 1st token', async()=>{

			var _uri = await contract.getAssetURI(1);
			console.log("uri of 1st token :", _uri);
			assert.equal(_uri,'uri1');
		})

	})



	describe('manipulating', async()=>{ // container for manipulating tests

		it('destroy tokens', async()=>{

			await contract.destroyAsset(1);

		})


	})


})