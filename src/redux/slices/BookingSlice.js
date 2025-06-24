// src/redux/slices/BookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  booking: [], // ✅ NOT null — must be an array
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.booking.push(action.payload);
    },
   clearBookingById: (state, action) => {
  const idToRemove = action.payload;
  state.booking = state.booking.filter(booking => booking.id !== idToRemove);
},
  },
});

export const { addBooking, clearBookingById } = bookingSlice.actions;
export default bookingSlice.reducer;
