/* TODO -- this is copied from the truffle compiler output - automate... */

/* eslint-disable quotes */
/* eslint-disable quote-props */
import web3 from "./web3";
//Your contract address
const address = "0xf89CA77171A11f382a9A039609472F2a57486781";
const abi = [
  {
    constant: true,
    inputs: [],
    name: "amount_to_pay",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x12006843"
  },
  {
    constant: false,
    inputs: [
      {
        name: "x",
        type: "string"
      }
    ],
    name: "setHash",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x1ed83fd4"
  },
  {
    constant: true,
    inputs: [],
    name: "getHash",
    outputs: [
      {
        name: "x",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xd13319c4"
  },
  {
    constant: false,
    inputs: [
      {
        name: "artist",
        type: "address"
      }
    ],
    name: "payArtist",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
    signature: "0xcdf9c06c"
  }
];
export default new web3.eth.Contract(abi, address);
