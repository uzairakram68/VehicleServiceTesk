import { GLOBAL_STATUS } from "../system";

export const authenticationConstants = {
  BEARER: "Bearer",
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  LOGIN_STATUS: {
    ...GLOBAL_STATUS,
  },
};
