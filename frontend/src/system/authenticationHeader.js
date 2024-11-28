import { getDecryptPayload } from "./encryption";
import {
  EMPTY_STRING,
  EMPTY_OBJECT,
  authenticationConstants,
} from "../constant";

//-------Function to return Authentication Header with JWT Token
export const authenticationHeader = () => {
  const payload = getDecryptPayload();
  const userToken = payload?.accessToken || EMPTY_STRING;

  if (userToken && userToken.length > 0) {
    return {
      Authorization: `${authenticationConstants.BEARER} ${userToken}`,
    };
  }
  return EMPTY_OBJECT;
};
