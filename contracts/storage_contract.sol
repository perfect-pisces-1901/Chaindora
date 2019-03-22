pragma solidity >= 0.4.17;

contract Contract {
  string ipfsHash;
 uint public amount_to_pay = 1 ether;

  function setHash(string memory x) public {
    ipfsHash = x;
  }

  function getHash() public view returns (string memory x) {
    return ipfsHash;
  }

  function payArtist(address payable artist) payable public {


}
}


 
