import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootReducers";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});
