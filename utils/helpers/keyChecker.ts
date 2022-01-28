import { ethers } from "ethers";
import hmacSHA512 from "crypto-js/hmac-sha512";
import config from "./config";
import { AES, HmacSHA256 } from "crypto-js";
import Base64 from "crypto-js/enc-base64";

declare let window: any;
export default async function KeyChecker(
  imageKey: any,
  key: string,
  address: string
) {
  if (!imageKey?.byteData) return;

  const _key = Base64.stringify(HmacSHA256(imageKey?.byteData, address));
  if (_key === key) {
    return true;
  }
  return false;
}
