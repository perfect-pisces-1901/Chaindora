import React, { Component } from "react";
import web3 from "../../src/web3";
import ipfs from "../../src/ipfs";
import storehash from "../../src/storehash";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { withStyles } from "@material-ui/core/styles";
// import Typography from '@material-ui/core/Typography'
import jspdf from "jspdf";

import Snackbar from "@material-ui/core/Snackbar";

const buttonStyle = {
  background: "#C4F0C5",
  borderRadius: 3,
  border: 0,
  color: "white",
  height: 48,
  width: 250,
  padding: "1000 30px"
};

const pdf = new jspdf();

class ArtistUpload extends Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      songName: "",
      genre: "",
      songFile: "",
      imageUrl:
        "https://www.shazam.com/resources/6a70bd6acae5578760b35e54e0d1e943d7579ae7/nocoverart.jpg",
      ipfsHash: "",
      buffer: "",
      ethAddress: "",
      transactionHash: "",
      txReceipt: "",
      open: false
    };
    this.captureFile = this.captureFile.bind(this);
    this.captureArtwork = this.captureArtwork.bind(this);
    this.convertToBuffer = this.convertToBuffer.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.downloadpdf = this.downloadpdf.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  downloadpdf() {
    pdf.setFontSize(22);
    pdf.text(
      10,
      10,
      `
                             Your Upload Receipt`
    );
    pdf.setFontSize(16);
    pdf.text(
      10,
      30,
      `    Song Name : ${this.state.songName}

    Song Upload Hash:
    ${this.state.ipfsHash}
    Contract Address:
    ${this.state.ethAddress}
    Transaction:
    ${this.state.transactionHash}`
    );

    pdf.setTextColor(100);
    // pdf.addImage(this.state.imageUrl, "JPG", 80, 40, 50, 50);
    pdf.save("Transaction_Receipt");
  }

  //Take file input from user
  async captureFile(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("FILES ARE: ", event.target.files);
    const file = event.target.files[0];
    console.log("FILE IS: ", file);
    await this.setState({ songFile: file.name });
    let reader = new window.FileReader();
    console.log("READER IS: ", reader);
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }
  async captureArtwork(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("FILES ARE: ", event.target.files);
    const file = event.target.files[0];
    console.log("FILE IS: ", file);
    await this.setState({ imageUrl: URL.createObjectURL(file) });
    console.log("STATE", this.state.imageUrl);
    let reader = new window.FileReader();
    console.log("READER IS: ", reader);
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }
  //Convert the file to buffer to store on IPFS
  async convertToBuffer(reader) {
    const buffer = await Buffer.from(reader.result);
    this.setState({ buffer });
  }
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

  async onChange(event) {
    event.preventDefault();
    await this.setState({
      [event.target.name]: event.target.value
    });
  }

  async onSubmit(event) {
    // storehash.options.address =
    //   "0x059105c50081b77e31a1c19e1223365698e2cb915ec2f35992388600b8d609fe";
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts, "metamask");
    //obtain contract address from storehash.js
    const ethAddress = await storehash.options.address;
    this.setState({ ethAddress });
    // eslint-disable-next-line handle-callback-err
    await ipfs.add(this.state.buffer, async (err, ipfsHash) => {
      // console.log(err, ipfsHash);
      this.setState({ ipfsHash: ipfsHash[0].hash });
      storehash.methods.setHash(this.state.ipfsHash).send(
        {
          from: accounts[0]
        },
        (error, transactionHash) => {
          console.log(error);
          this.setState({ transactionHash, open: true });
        }
      );
      const song = {
        ipfsHash,
        artist: this.state.artist,
        imageUrl: this.state.imageUrl,
        title: this.state.songName,
        genre: this.state.genre,
        ethAddress: accounts[0]
      };
      await axios.post(`/api/songs`, song);
    });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    console.log("IMAGE URL:", this.state.imageUrl);
    return (
      <div className="App">
        <div id="artistform">
          <div id="formbox">
            <div id="formupload">
              <div>
                <h2>Upload your songs here:</h2>
                <div>
                  <form onSubmit={this.onSubmit}>
                    <TextField
                      required
                      type="text"
                      name="artist"
                      id="standard-name"
                      label="Artist Name"
                      margin="normal"
                      onChange={this.onChange}
                    />
                    <TextField
                      required
                      type="text"
                      name="songName"
                      id="standard-name"
                      label="Song Title"
                      margin="normal"
                      onChange={this.onChange}
                    />
                    <TextField
                      required
                      type="text"
                      name="genre"
                      id="standard-name"
                      label="Genre"
                      margin="normal"
                      onChange={this.onChange}
                    />
                    <br />
                    <div>
                      <input
                        id="uploadSong"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.captureFile}
                      />
                      <label htmlFor="uploadSong">
                        <Button style={buttonStyle} component="span">
                          Upload Song
                        </Button>
                      </label>
                      <br />
                      <p id="songFile">{this.state.songFile}</p>
                      <input
                        id="uploadAlbumArtwork"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.captureArtwork}
                      />
                      <br />
                      <label htmlFor="SendToBlockchain">
                        <Button
                          style={buttonStyle}
                          type="submit"
                          disabled={!this.state.songFile}
                        >
                          Send it
                        </Button>
                      </label>
                      <br />
                      <p>
                        <label htmlFor="TransactionReceipt">
                          <Button
                            style={buttonStyle}
                            onClick={this.downloadpdf}
                            disabled={!this.state.transactionHash}
                          >
                            {" "}
                            Get Transaction Receipt{" "}
                          </Button>
                        </label>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div id="formcoverart">
              <p>Cover Art Preview</p>
              <img id="cover-art" src={this.state.imageUrl} />
              <label htmlFor="uploadAlbumArtwork">
                <Button style={buttonStyle} component="span">
                  Upload Album Artwork
                </Button>
              </label>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {this.state.songName} was successfully uploaded
            </span>
          }
        />
      </div>
    );
  }
}
export default ArtistUpload;
