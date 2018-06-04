// 2_deploy_contracts.js
var Shop = artifacts.require("./Shop.sol");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Shop);
};
