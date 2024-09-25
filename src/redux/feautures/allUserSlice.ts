import { TUser } from "@/types/allTyps";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  users: TUser[] | null;
};
const initialState: TInitialState = {
  users: null,
};

export const AllUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUsersBlockStatusInState: (state, action) => {
      const { _id, isBlocked } = action.payload;

      const userIndex = state.users?.findIndex((item) => item._id === _id);
      if (userIndex !== -1 && typeof userIndex === "number") {
        state.users![userIndex].isBlocked = isBlocked;
      }
    },
    updateUsersRoleStatusInState: (state, action) => {
      const { _id, role } = action.payload;

      const userIndex = state.users?.findIndex((item) => item._id === _id);
      if (userIndex !== -1 && typeof userIndex === "number") {
        state.users![userIndex].role = role;
      }
    },
  },
});

export const {
  setUsers,
  updateUsersBlockStatusInState,
  updateUsersRoleStatusInState,
} = AllUserSlice.actions;
export default AllUserSlice.reducer;
