// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract MyAsset is ERC721URIStorage{

  	address public admin;
  	string public data;

  	using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;   

    mapping(uint => string) allTokens; 


    //admin is the contract deployer
    constructor () ERC721("PublicAsset", "PA") { //(name,symbol)
      	admin = msg.sender;
    }
    

    function setStr(string memory _uri) public {
    	  data = _uri;
    }


    //access of this function should be admin specific not public/ for testing I put public
    function creatAsset(string memory tokenURI) public { 

    	require(msg.sender == admin, 'only admin can create assets');
     
    	  _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        allTokens[newItemId]=tokenURI;
        
    }
    
    function getAssetURI(uint id) public view returns(string memory){
        return tokenURI(id);
    }


    function destroyAsset(uint id) public {
    	_burn(id);
    }

    function totalAssetCount()public view returns(uint){
        return _tokenIds.current();
    }

    function AssetExists(uint256 id) public view returns(bool){
        return _exists(id);
    }
    
    
}