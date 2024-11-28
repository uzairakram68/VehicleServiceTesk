import { postRequest } from "../system/serverCall";
import { encryptObject } from "../system/encryption";
import { authenticationConstants } from "../constant";
import { setItemToStorage } from "../system/storage";
import serverResponseHandler from "../system/serverResponseHandler";

//-------handling the Login response
//-------if user is authenticated then saving
//-------the jwt token in the local storage

//-------Handle login response
const handleLoginResponse = (response) => {
  const { status } = response;

  if (status !== authenticationConstants.LOGIN_STATUS.SUCCESS) {
    return serverResponseHandler.handleServerResponse(response);
  }

  const encryptedPayload = encryptObject({
    ...response.data.data,
  });

  setItemToStorage(process.env.REACT_APP_PAYLOAD, encryptedPayload);
  return response.data.data;
};

//-------Authenticating the user from server
const login = (userLoginData) => {
  return postRequest("login", userLoginData, false).then(
    (response) => handleLoginResponse(response),
    (error) => serverResponseHandler.handleHTTPResponses(error.response)
  );
};

//-------Export Authentication Services
export const authenticationService = { login };
