import { TBooking } from "@/types/allTyps";
import { createSlice } from "@reduxjs/toolkit";

type bookingState = {
  data: TBooking[];
  booking: TBooking[];
};

const initialState: bookingState = {
  data: [],
  booking: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      state.data = action.payload;
      state.booking = action.payload;
    },

    filterBookingByStatus: (state, action) => {
      if (!action.payload) {
        state.booking = state.data;
        return;
      }

      const filterCollection = state.data?.filter(
        (item) => item.status === action.payload
      );
      if (filterCollection) {
        state.booking = filterCollection;
      }
    },

    updateBookingStatus: (state, action) => {
      const { bookingId, newStatus } = action.payload;
      const bookingIndex = state.booking.findIndex(
        (item) => item._id === bookingId
      );
      if (bookingIndex !== -1) {
        state.booking[bookingIndex].status = newStatus;
      }
    },
  },
});

export const { setBookingData, filterBookingByStatus, updateBookingStatus } =
  bookingSlice.actions;

export default bookingSlice.reducer;
