import { ethers } from "ethers";
import { AccessStatus } from "../../types/accessStatus.enum";
import config from "./config";
import KeyChecker from "./keyChecker";

declare let window: any;
export default async function keyGetter(imageKey: any, address: string) {
  if (typeof window !== "undefined") {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        config.keyRegistrar.address,
        config.keyRegistrar.abi,
        signer
      );
      try {
        const data = await contract.getKey();
        let accessStatus: any = undefined;
        const res = await KeyChecker(imageKey, data, address);
        if (data === "") {
          accessStatus = AccessStatus.KEY_NOT_FOUND;
        } else if (res) {
          accessStatus = AccessStatus.KEY_MATCHED;
        } else {
          accessStatus = AccessStatus.KEY_NOT_MATCHED;
        }
        return {
          key: data,
          accessStatus,
        };
      } catch (err) {
        console.log(err);
      }
    }
  }
}
