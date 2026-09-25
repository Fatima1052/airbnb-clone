import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },

  // The selected dates are dayjs objects (not plain data). That is fine here,
  // so tell Redux Toolkit not to warn about them in the console.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["search/setStartDate", "search/setEndDate"],
        ignoredPaths: ["search.startDate", "search.endDate"],
      },
    }),
});
