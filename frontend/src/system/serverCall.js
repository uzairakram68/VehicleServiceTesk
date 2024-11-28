import axios from "axios";
import { authenticationHeader } from "./authenticationHeader";

//-------Build Url for server api call
const buildURL = (url) => {
  let BaseUrl = process.env.REACT_APP_BASE_URL;
  return BaseUrl + url;
};

//-------Build headers for the server api call
const buildHeaders = (authorization) => {
  let headers = {
    Accept: "application/json",
  };

  if (authorization === true) {
    headers = { ...headers, ...authenticationHeader() };
  }

  return headers;
};

//-------Get request to the server
const getRequest = (url, authorization = true) => {
  const completeUrl = buildURL(url);

  const requestOptions = {
    method: "GET",
    headers: buildHeaders(authorization),
  };

  axios.defaults.withCredentials = false;
  return axios(completeUrl, requestOptions);
};

//-------Delete request to the server
const deleteRequest = (url, authorization = true) => {
  const completeUrl = buildURL(url);

  const requestOptions = {
    method: "DELETE",
    headers: buildHeaders(authorization),
  };

  axios.defaults.withCredentials = false;
  return axios(completeUrl, requestOptions);
};

//-------Post request to the server
const postRequest = (url, dataObject, authorization = true) => {
  const completeUrl = buildURL(url);

  const requestOptions = {
    method: "POST",
    headers: buildHeaders(authorization),
    data: dataObject,
  };
  axios.defaults.withCredentials = false;
  return axios(completeUrl, requestOptions);
};

//-------Put request to the server
const putRequest = (url, dataObject, authorization = true) => {
  const completeUrl = buildURL(url);

  const requestOptions = {
    method: "PUT",
    headers: buildHeaders(authorization),
    data: JSON.stringify(dataObject),
  };

  axios.defaults.withCredentials = false;
  return axios(completeUrl, requestOptions);
};

export { getRequest, postRequest, putRequest, deleteRequest };
