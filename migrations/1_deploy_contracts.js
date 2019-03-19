const Contract = artifacts.require("Contract");

module.exports = function(deployer) {
  deployer.deploy(Contract)
    .then(() => console.log(Contract.address))

    // Option 3) Retrieve the contract instance and get the address from that:
    //.then(() => SimpleStorage.deployed())
    //.then(_instance => console.log(_instance.address));
}