import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const NavigateToPath = (history, path, name, id, state) => {
  // but you can use a location instead
  const location = {
    pathname: path,
    state: {
      ...state,
      name: name ? name : history.location.state?.name,
    },
    id: id,
  };

  if (history.location.pathname !== path) {
    history.push(location);
  }
};

export const NavigateToDefault = (history) => {
  history.push("/OperatorUtilities");
  history.replace("/OperatorUtilities");
};

export const navigateToLogin = () => {
  history.replace("/log_in", { name: "LogIn" });
  history.go(-history);
};
