import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userWithRoadmap: [], // Initial state for users with roadmaps
  },
  reducers: {
    // Action to set the users with roadmaps
    setUserWithRoadmap: (state, action) => {
      state.userWithRoadmap = action.payload;
    },
  },
});

export const { setUserWithRoadmap } = userSlice.actions;
export default userSlice.reducer;
