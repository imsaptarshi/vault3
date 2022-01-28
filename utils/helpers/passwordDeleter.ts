import { ethers } from "ethers";
import config from "./config";
import CryptoJs from "crypto-js";
import { v4 as uuidv4 } from "uuid";

declare let window: any;
export default async function passwordDeleter(uid: string) {
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
        const transaction = await contract.deletePassword(uid);
        await transaction.wait();
        return transaction;
      } catch (err) {
        return err;
      }
    }
  }
}
