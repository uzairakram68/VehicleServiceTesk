import { thunk } from "redux-thunk";
import AllReducers from "../redux/reducer";
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { systemConstants } from "../constant";

const { ...AllOtherReducers } = AllReducers;
const reducer = combineReducers({ ...AllOtherReducers });

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: systemConstants.REDUX_TRACE_LIMIT,
    })) ||
  compose;

//-------Create Store
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

//-------Export Store
export default store;
