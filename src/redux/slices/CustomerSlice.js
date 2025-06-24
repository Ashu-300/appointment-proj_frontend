import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerInfo: null,
  isLoggedIn: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    login: (state, action) => {
      state.customerInfo = action.payload;  // store user data here
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.customerInfo = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = customerSlice.actions;
export default customerSlice.reducer;
