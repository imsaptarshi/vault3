/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from "ethers";
import config from "./config";
import CryptoJs from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { StorageContext } from "../providers/Database.provider";

declare let window: any;
export default async function fileGetter() {
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
        const data = await contract.getFiles();
        let files: Array<any> = [];
        data.forEach((file: any) => {
          if (file.uid.length > 0) {
            files.push(file);
          }
        });
        return files.reverse();
      } catch (err) {
        console.log(err);
      }
    }
  }
}
