import CryptoJS from "crypto-js";

import { clearBothStorage } from "./storage";
import { EMPTY_STRING, EMPTY_OBJECT } from "../constant";
import { parseJsonObject, stringifyObject } from "../shared/utility";
import { globalConstants, authenticationConstants } from "../constant";

//-------Encrypt the object
export const encryptObject = (object) => {
  var cipherText = CryptoJS.AES.encrypt(
    stringifyObject(object),
    process.env.REACT_APP_ENCRYPTED_KEY
  ).toString();

  return cipherText;
};

//-------Decrypt the object
export const decryptObject = (
  encryptedString,
  key = process.env.REACT_APP_ENCRYPTED_KEY
) => {
  try {
    if (encryptedString !== globalConstants.EMPTY_STRING) {
      var bytes = CryptoJS.AES.decrypt(encryptedString, key);
      // password encryption check as password is not a json but payload is a json
      var decryptedData =
        key !== process.env.REACT_APP_PASSWORD_ENCRYPTED_KEY
          ? parseJsonObject(bytes.toString(CryptoJS.enc.Utf8))
          : bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    } else {
      return EMPTY_OBJECT;
    }
  } catch (e) {
    clearBothStorage(process.env.REACT_APP_PAYLOAD);
    window.location.reload();
  }
};

//-------Decrypt Payload
export const getDecryptPayload = () => {
  const encryptedPayload =
    getItemFromStorage(process.env.REACT_APP_PAYLOAD) || EMPTY_STRING;
  const payload = decryptObject(encryptedPayload);
  return payload;
};
