/* TODO -- this is copied from the truffle compiler output - automate... */


/* eslint-disable quotes */
/* eslint-disable quote-props */
import web3 from "./web3";
//Your contract address
const address = "0x132ea5526845E5A4bb8E5Bd0707f09eC7299d8E8";
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "name": "setHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x1ed83fd4"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getHash",
    "outputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xd13319c4"
  }
];
export default new web3.eth.Contract(abi, address);
