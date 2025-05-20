
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalSeats: 500,
  bookedSeats: [],
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    fetchTicketsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTicketsSuccess: (state, action) => {
      state.bookedSeats = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTicketsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    bookTicketStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    bookTicketSuccess: (state, action) => {
      state.bookedSeats.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    bookTicketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTicketsStart,
  fetchTicketsSuccess,
  fetchTicketsFailure,
  bookTicketStart,
  bookTicketSuccess,
  bookTicketFailure,
} = ticketSlice.actions;
export default ticketSlice.reducer;
