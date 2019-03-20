pragma solidity >= 0.4.17;

contract Contract {
  string ipfsHash;
  uint amount = 2 ether;

  function setHash(string memory x) public {
    ipfsHash = x;
  }

  function getHash() public view returns (string memory x) {
    return ipfsHash;
  }

  function payArtist(address payable artist ) payable public {
      artist.transfer(amount);
  }
 

}
