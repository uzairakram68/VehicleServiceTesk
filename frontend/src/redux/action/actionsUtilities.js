import { globalConstants } from "../../constant";

//-------Request reponse on action to reducer
const request = (data, type, component = "") => {
  return {
    type: (component ? `${component}_` : "") + type + globalConstants.REQUEST,
    data,
  };
};

//-------Success reponse on action to reducer
const success = (data, type, component = "") => {
  return {
    type: (component ? `${component}_` : "") + type + globalConstants.SUCCESS,
    data,
  };
};

//-------Failure reponse on action to reducer
const failure = (data, type, component = "") => {
  return {
    type: (component ? `${component}_` : "") + type + globalConstants.FAILURE,
    data,
  };
};

//-------Custom reponse on action to reducer
const custom = (data, type, component = "") => {
  return { type: (component ? `${component}_` : "") + type, data };
};

//-------Export all reponses
export { request, success, failure, custom };
