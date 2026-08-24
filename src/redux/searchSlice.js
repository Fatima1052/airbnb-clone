import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  startDate: null,
  endDate: null,
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },

    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },

    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },

    setAdults: (state, action) => {
      state.adults = action.payload;
    },

    setChildren: (state, action) => {
      state.children = action.payload;
    },

    setInfants: (state, action) => {
      state.infants = action.payload;
    },

    setPets: (state, action) => {
      state.pets = action.payload;
    },
    increaseAdults: (state) => {
  state.adults += 1;
},

decreaseAdults: (state) => {
  state.adults = Math.max(0, state.adults - 1);
},

increaseChildren: (state) => {
  state.children += 1;
},

decreaseChildren: (state) => {
  state.children = Math.max(0, state.children - 1);
},

increaseInfants: (state) => {
  state.infants += 1;
},

decreaseInfants: (state) => {
  state.infants = Math.max(0, state.infants - 1);
},

increasePets: (state) => {
  state.pets += 1;
},

decreasePets: (state) => {
  state.pets = Math.max(0, state.pets - 1);
},
  },
});

export const {
  setLocation,
  setStartDate,
  setEndDate,
  setAdults,
  setChildren,
  setInfants,
  setPets,
  increaseAdults,
  decreaseAdults,
  increaseChildren,
  decreaseChildren,
  increaseInfants,
  decreaseInfants,
  increasePets,
  decreasePets,
} = searchSlice.actions;

export default searchSlice.reducer;