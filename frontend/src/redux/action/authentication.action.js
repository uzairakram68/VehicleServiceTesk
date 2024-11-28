import { custom } from "./actionsUtilities";
import { success } from "./actionsUtilities";
import { authenticationService } from "../../services";
import {
  authenticationConstants,
  systemConstants,
  toastType,
} from "../../constant";
import { clearStorage } from "../../system/storage";
import { getUserInfoFromToken } from "../../system/encryption";
import { customToast } from "../../shared/utility";

//-------Login function to handle user login
const login = (userLoginData) => {
  return (dispatch) => {
    dispatch(
      custom(
        authenticationConstants.USER_LOGIN,
        systemConstants.SPINNER_ACTIVATE
      )
    );
    authenticationService
      .login(userLoginData)
      .then(
        (response) => {
          const user = getUserInfoFromToken(response.accessToken);
          dispatch(
            success(
              { ...response, user: user },
              authenticationConstants.USER_LOGIN
            )
          );
        },
        (error) => {
          customToast(error, toastType.ERROR);
        }
      )
      .finally(() => {
        dispatch(
          custom(
            authenticationConstants.USER_LOGIN,
            systemConstants.SPINNER_DEACTIVATE
          )
        );
      });
  };
};

//-------Logout Action
const logout = () => {
  return (dispatch) => {
    dispatch(
      custom(
        authenticationConstants.USER_LOGOUT,
        systemConstants.SPINNER_ACTIVATE
      )
    );
    clearStorage();
    dispatch(success(false, authenticationConstants.USER_LOGOUT));
    dispatch(
      custom(
        authenticationConstants.USER_LOGOUT,
        systemConstants.SPINNER_DEACTIVATE
      )
    );
  };
};

//-------Export Authentication Actions
export const authenticationActions = { login, logout };
