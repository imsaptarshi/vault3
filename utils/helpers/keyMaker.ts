import { ethers } from "ethers";
import config from "./config";
import { HmacSHA256 } from "crypto-js";
import Base64 from "crypto-js/enc-base64";

declare let window: any;
export default async function KeyMaker(imageKey: any, address: string) {
  if (!imageKey?.byteData) return;
  if (typeof window !== "undefined") {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        config.keyRegistrar.address,
        config.keyRegistrar.abi,
        signer
      );
      const key = await Base64.stringify(
        HmacSHA256(imageKey?.byteData, address)
      );
      const transaction = await contract.setKey(key);
      await transaction.wait();
    }
  }
}
