import web3 from "./web3";
//Your contract address
const address = "0x17355bd6ee4a523a7693a9ffd3401e0b1b0713f0";
const abi = [
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
    type: "function"
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
    type: "function"
  }
];
export default new web3.eth.Contract(abi, address);
