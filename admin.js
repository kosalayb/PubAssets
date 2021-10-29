$(document).ready( function () { 


	$("#burnNFT").click(async function(){

			if(!account){
				alert("Select an authorised account to create assets");
				return;
			}

			var _id=$("#assetID").val();
			instance.methods.destroyAsset

			instance.methods.destroyAsset(_id).send({
					from: account,
			 		gas:250000,
			 		gasPrice:'125000000000'
				})
				.then(function(tx){
					console.log("asset deletion transaction on blockchain:",tx);
					alert("Asset Deleted Successfully from the Blockchian");
				});

	});




	$("#addToken").click(async function(){

			if(!account){
				alert("Select an authorised account to create assets");
				return;
			}


			alert("Token adding to IPFS and Blockchain");

			var _type=$("#_type").val();
			var _mac=$("#_mac").val();
			var _purDate=$("#_purDate").val();
			var _cost=$("#_cost").val();

			//build a json object for prescription details
			var tokenDetails = JSON.stringify({
				"type": _type,
				"MACAddress":_mac,
				"purchasedDate":_purDate,
				"cost":_cost
			});


			$.ajax({
					url:"http://localhost:3000/addToken",
					method:"POST",
					data:tokenDetails,
					contentType:"application/json",
					async: false,
					success: function(_hash){ 
						console.log("write Json to IPFS:"+_hash);

						//TODO: connect to blockchain and write token to blockchian
						var _uri="https://gateway.ipfs.io/ipfs/"+_hash;
						_uri=_uri.toString();

						console.log(_uri);
					
						instance.methods.creatAsset(_uri).send({
							from: account,
					 		gas:350000,
					 		gasPrice:'125000000000'
						})
						.then(function(tx){
							console.log("create asset transaction on blockchain:",tx);
							alert("Asset created on IPFS and recorded on blockchain");
						});

					},
					error:function(jqXHR, textStatus, errorThrown){
						alert("Error creating asset !!!!");
				   		console.log("POST ERROR :"+errorThrown);
				   	}

			});


	});//end addToken click function



});