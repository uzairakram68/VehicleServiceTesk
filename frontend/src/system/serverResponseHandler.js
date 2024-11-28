// eslint-disable-next-line import/no-cycle
import { clearBothStorage } from "./storage";
import { GLOBAL_STATUS } from "./globalEnums";
import { toastMessages, globalConstants } from "../constant";

//-------Handle http response
const handleHTTPResponses = (httpResponse) => {
  let errrorMessage = globalConstants.EMPTY_STRING;
  if (!httpResponse) {
    errrorMessage = toastMessages.NETWORK_ERROR;
    return Promise.reject(errrorMessage);
  }
  switch (httpResponse.status) {
    case GLOBAL_STATUS.BAD_REQUEST:
      errrorMessage = httpResponse.data?.message;
      break;

    case GLOBAL_STATUS.UNAUTHORIZED:
      errrorMessage = toastMessages.NOT_AUTHORIZED_TO_PERFORM_ACTION;
      clearBothStorage();
      break;

    case GLOBAL_STATUS.NOT_FOUND:
      errrorMessage = toastMessages.ITEM_NOT_FOUND;
      break;

    case GLOBAL_STATUS.INTERNAL_SERVER_ERROR:
      errrorMessage = toastMessages.PLEASE_CONTACT_AADMINISTRATOR;
      break;

    default:
      errrorMessage = toastMessages.PLEASE_CONTACT_AADMINISTRATOR;
      break;
  }

  return Promise.reject(errrorMessage);
};

export default {
  handleHTTPResponses,
};
