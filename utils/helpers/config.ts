import KeyRegistrar from "../../artifacts/contracts/KeyRegistrar.sol/KeyRegistrar.json";
import UserVault from "../../artifacts/contracts/UserVault.sol/UserVault.json";

const config = {
  chainId: 80001,
  maxFileSize: 8388608,
  keyRegistrar: {
    address: "0x9d0DD96DbD54160de4bBe4B198529112727A9546",
    abi: KeyRegistrar.abi,
  },
  userVault: {
    address: "0xd0D33121fDA87Abf87BbF428D27b429a1C771eEB",
    abi: UserVault.abi,
  },
};

export default config;
