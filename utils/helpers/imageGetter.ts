import { ethers } from "ethers";
import config from "./config";
import CryptoJs from "crypto-js";
import { v4 as uuidv4 } from "uuid";

declare let window: any;
export default async function ImageGetter(uid: string) {
  if (typeof window !== "undefined") {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        config.userVault.address,
        config.userVault.abi,
        signer
      );
      try {
        const data = await contract.getImage(uid);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
