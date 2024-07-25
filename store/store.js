import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";

// Create Redux store with thunk middleware and Redux DevTools integration
const store = configureStore({
  reducer: rootReducer,
});

export default store;
