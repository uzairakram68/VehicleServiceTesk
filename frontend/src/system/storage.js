//-------Set item to session storage
export const setItemToSessionStorage = (keyname, value) => {
  return sessionStorage.setItem(keyname, value);
};

//-------Get item from session storage
export const getItemFromSessionStorage = (keyname) => {
  return sessionStorage.getItem(keyname);
};

//-------Remove item from session storage
export const removeItemFromSessionStorage = (keyname) => {
  return sessionStorage.removeItem(keyname);
};

//-------Is item In session storage
export const isItemInSessionStorage = (keyname) => {
  return sessionStorage.hasOwnProperty(keyname);
};

//-------Set item to local storage
export const setItemToLocalStorage = (keyname, value) => {
  return localStorage.setItem(keyname, value);
};

//-------Is item In local storage
export const isItemInLocalStorage = (keyname) => {
  return localStorage.hasOwnProperty(keyname);
};

//-------Get item local session storage
export const getItemFromLocalStorage = (keyname) => {
  return localStorage.getItem(keyname);
};

//-------Clear all session storage
export const clearSessionStorage = () => {
  sessionStorage.clear();
};

//-------Clear all local storage
export const clearLocalStorage = () => {
  localStorage.clear();
};

//-------Clear Both Storage
export const clearBothStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};
