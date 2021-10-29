$(document).ready( function () { 

	
	$("#viewToken").click(async function(){

		//calling a public variable from solidity smart contract
		var _address = await instance.methods.admin().call(function(err,res){
			console.log(res);
		});

		console.log("Admin address :",_address);

		// var _name = await instance.methods.name().call();
		// console.log("Asset Name :",_name);
		

		// var _count = await instance.methods.balanceOf(_address).call();
		// console.log("Total Number of Assets:",_count);

		var assetCount = await instance.methods.totalAssetCount().call();
		console.log("total asset count",assetCount );


		//view token URIs and owners' address
		console.log("Token URI", "Owner"); 
		document.getElementById('mydiv').innerHTML=" Asset ID <<======>> Asset URI  <<========>>"+" Owner"+"<br>";
		var _uri;
		var _owner;
		for(i = 1; i <=assetCount; i++){

			var _exists =await instance.methods.AssetExists(i).call();
			console.log(_exists);
			if(!_exists){
				continue;
			}

			_uri = await instance.methods.getAssetURI(i).call();
         	_owner=await instance.methods.ownerOf(i).call(); 
		

           	console.log(_uri, _owner);
         	document.getElementById('mydiv').innerHTML+=i+"<<===>>"+_uri+"<<===>>"+_owner+"<br>";
      	}
		
	});






	//trace token by id
	$("#traceToken").click(async function(){

		var _id=$("#assetId").val();
		var _str="";

		instance.getPastEvents('Transfer',
			        {
			              fromBlock: 0,
			              toBlock: 'latest'
			        },
			        (error, events)=>{
				          console.log("number of events :"+events.length);
						  let len=events.length;

						  document.getElementById('mydiv').innerHTML="  From  ===="+"T0  ===="+"Asset Id"+"<br>";

						  for(let i=len-1; i>=0;i--){

						  		var tmp=events[i];
						  		var _from=tmp.returnValues['from'];
						  		var _to=tmp.returnValues['to'];
						  		var _tokenId = tmp.returnValues['tokenId'];

						  		if(_id ==_tokenId){
						  			_str = _from+"  ====" + _to +"  ===="+_tokenId;
						  			document.getElementById('mydiv').innerHTML+=_str +"<br>";
						  		}

	    				  }//end for
				 
				    }
				);


	});





	$("#traceAllToken").click(async function(){

		var _str="";

		instance.getPastEvents('Transfer',
			        {
			              fromBlock: 0,
			              toBlock: 'latest'
			        },
			        (error, events)=>{
				          console.log("number of events :"+events.length);
						  let len=events.length;

						  document.getElementById('mydiv').innerHTML="  From  ===="+"T0  ===="+"Asset Id"+"<br>";

						  for(let i=len-1; i>=0;i--){

						  		var tmp=events[i];
						  		var _from=tmp.returnValues['from'];
						  		var _to=tmp.returnValues['to'];
						  		var _tokenId = tmp.returnValues['tokenId'];

						  		_str = _from+"  ====" + _to +"  ===="+_tokenId;

						  		document.getElementById('mydiv').innerHTML+=_str +"<br>";

						  }//end for
				 
				    }
				);



	});




	

	// document.getElementById("fromAdd").value="";
	// $("#setOwner").click(async function(){
	// 	console.log(account);
	// 	document.getElementById("fromAdd").value = account;
	// });



	$("#assetTransfer").click(async function(){

		var _to=$("#toAdd").val();
		var _tokenID=$("#assetID").val();

		await instance.methods.transferFrom(account, _to,_tokenID).send({
			from: account,
			gas:1500000,
			gasPrice:'125000000000'
		})
		.then(function(tx){
			console.log("create asset transaction on blockchain:",tx);
			alert("Asset transfered successsfully");
		});



	});





});