import { ethers } from "ethers";
import config from "./config";
import CryptoJs from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "./supabase";
import { match } from "assert";

declare let window: any;
export default async function documentDeleter(uid: string) {
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
        const transaction = await contract.deleteDocument(uid);
        await transaction.wait();
        await supabase.from("documents").delete().match({ uid: uid });
        return transaction;
      } catch (err) {
        return err;
      }
    }
  }
}
