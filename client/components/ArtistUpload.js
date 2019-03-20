import React, { Component } from "react";
import web3 from "../../src/web3";
import ipfs from "../../src/ipfs";
import storehash from "../../src/storehash";
import { Button } from "reactstrap";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

class ArtistUpload extends Component {
  constructor() {
    super();
    this.state = {
      songTitle: "",
      genre: "",
      imageUrl:
        "https://www.shazam.com/resources/6a70bd6acae5578760b35e54e0d1e943d7579ae7/nocoverart.jpg",
      ipfsHash: null,
      buffer: "",
      ethAddress: "",
      transactionHash: "",
      txReceipt: ""
    };
    this.captureFile = this.captureFile.bind(this);
    this.convertToBuffer = this.convertToBuffer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  //Take file input from user
  captureFile(event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }
  //Convert the file to buffer to store on IPFS
  async convertToBuffer(reader) {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    this.setState({ buffer });
  }
  //ES6 async function
  async onClick() {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });
      await web3.eth.getTransactionReceipt(
        this.state.transactionHash,
        (err, txReceipt) => {
          console.log(err, txReceipt);
          this.setState({ txReceipt });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async handleChange(event) {
    event.preventDefault();
    await this.setState({
      [event.target.name]: event.target.value
    });
  }

  async onSubmit(event) {
    // storehash.options.address =
    //   "0x059105c50081b77e31a1c19e1223365698e2cb915ec2f35992388600b8d609fe";
    event.preventDefault();
    //bring in user's metamask account address
    const accounts = await web3.eth.getAccounts();
    console.log(accounts, "metamask");
    //obtain contract address from storehash.js
    const ethAddress = await storehash.options.address;
    this.setState({ ethAddress });
    console.log(this.state.ethAddress, "*******");
    //save document to IPFS,return its hash#, and set hash# to state
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      // console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
      //return the transaction hash from the ethereum contract

      storehash.methods.setHash(this.state.ipfsHash).send(
        {
          from: accounts[0]
        },
        (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({ transactionHash });
        }
      );
      axios.post(`/api/songs`, ipfsHash).then(res => {
        console.log("axios res", res);
        console.log("axios res.data", res.data);
      });
    });
  }
  render() {
    return (
      <div className="App">
        <div>
          <div id="formbox">
            <div>
              <h2>Upload your audio here:</h2>
              <div>
                <form onSubmit={this.onSubmit}>
                  <TextField
                    required
                    type="text"
                    name="songTitle"
                    id="standard-name"
                    label="Song Title"
                    margin="normal"
                    onChange={this.handleChange}
                  />
                  <br />
                  <TextField
                    required
                    type="text"
                    name="genre"
                    id="standard-name"
                    label="Genre"
                    margin="normal"
                    onChange={this.handleChange}
                  />
                  <br />
                  <input type="file" onChange={this.captureFile} />
                  <Button bsstyle="primary" type="submit">
                    Send it
                  </Button>
                </form>
              </div>
            </div>
            <div>
              <p>Cover Art Preview</p>
              <img src={this.state.imageUrl} />
            </div>
          </div>
          <hr />
          <Button onClick={this.onClick}> Get Transaction Receipt </Button>
          <hr />
          <table bordered="true" responsive="true">
            <thead>
              <tr>
                <th>Your Upload Receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Song Upload Hash:</td>
                <td>{this.state.ipfsHash}</td>
              </tr>
              <tr>
                <td>Contract Address:</td>
                <td>{this.state.ethAddress}</td>
              </tr>
              <tr>
                <td>Transaction:</td>
                <td>{this.state.transactionHash}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ArtistUpload;
