const MyAsset = artifacts.require("MyAsset");

module.exports = function (deployer) {
  deployer.deploy(MyAsset);
};
