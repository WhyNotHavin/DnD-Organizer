import { createStore, applyMiddleware, combineReducers } from "redux";
import loggingMiddleware from "redux-logger";
import thunk from "redux-thunk";
import Reducer from "./spells";
import userReducer from "./user";
const rootReducer = combineReducers({
  spells: Reducer,
  user: userReducer,
});

export default createStore(
  rootReducer,
  applyMiddleware(thunk, loggingMiddleware)
);
