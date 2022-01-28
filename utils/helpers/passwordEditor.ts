import { ethers } from "ethers";
import config from "./config";
import CryptoJs from "crypto-js";
import { v4 as uuidv4 } from "uuid";

declare let window: any;
export default async function passwordEditor(
  url: string,
  username: string,
  password: string,
  address: string,
  uid: string
) {
  if (password.length < 1) return;
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
        const hash = await CryptoJs.AES.encrypt(password, address).toString();
        const size = await String(new Blob([hash]).size);
        const transaction = await contract.editPassword(
          uid,
          hash,
          url,
          username,
          size
        );
        await transaction.wait();
        return transaction;
      } catch (err) {
        return err;
      }
    }
  }
}
