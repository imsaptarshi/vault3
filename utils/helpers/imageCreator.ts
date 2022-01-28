import { ethers } from "ethers";
import config from "./config";
import CryptoJs from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "./supabase";

declare let window: any;
export default async function imageCreator(
  name: string,
  byteData: string,
  imageType: string,
  size: string,
  address: string
) {
  if (name.length < 1) return;
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
        const hash = await CryptoJs.AES.encrypt(byteData, address).toString();
        const uid = await uuidv4();
        const transaction = await contract.createImage(
          uid,
          name,
          imageType,
          size
        );
        await transaction.wait();
        await supabase
          .from("images")
          .upsert({ uid: uid, hash: hash }, { returning: "minimal" });
        return transaction;
      } catch (err) {
        return err;
      }
    }
  }
}
