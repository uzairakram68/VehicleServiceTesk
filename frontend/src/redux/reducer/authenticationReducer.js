import { updateObject } from "../../shared/utility";
import { getDecryptPayload } from "../../system/encryption";
import { authenticationConstants, globalConstants } from "../../constant";

//-------initializing the token from the browser
const payload = getDecryptPayload();
const accessToken = payload.accessToken || globalConstants.EMPTY_STRING;
const refreshToken = payload.refreshToken || globalConstants.EMPTY_STRING;

//-------InitialState of the reducer
const initialState = {
  accessToken,
  refreshToken,
  user,
  isAuthenticated: accessToken.length > 0,
};

//-------Export Authentication Reducer
export const authentication = (state = initialState, action) => {
  switch (action.type) {
    //-------User login success case
    case authenticationConstants.USER_LOGIN + globalConstants.SUCCESS:
      return updateObject(state, {
        isAuthenticated: true,
        acccessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        user: action.data.user,
      });
    //-------User login failure case
    case authenticationConstants.USER_LOGIN + globalConstants.FAILURE:
      return updateObject(state, {
        isAuthenticated: false,
        accessToken: globalConstants.EMPTY_STRING,
        refreshToken: globalConstants.EMPTY_STRING,
      });
    //-------User logout failure case
    case authenticationConstants.USER_LOGOUT + globalConstants.SUCCESS:
      return updateObject(state, {
        isAuthenticated: action.data,
        acccessToken: globalConstants.EMPTY_STRING,
        refreshToken: globalConstants.EMPTY_STRING,
      });

    //-------Default State
    default:
      return state;
  }
};
