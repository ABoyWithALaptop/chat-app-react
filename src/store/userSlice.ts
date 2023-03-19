import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types/types";
import { getFriendList } from "../utils/api";

export interface UserState {
  currentUser?: User;
  friendList: User[];
}
const initialState: UserState = {
  currentUser: undefined,
  friendList: [],
};
export const fetchUserFriendList = createAsyncThunk(
  "user/fetchFriendList",
  async (thunkAPI) => {
    const { data } = await getFriendList();
    return data;
  }
);

/* Creating a slice of the state. */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    addFriends: (state, action: PayloadAction<User>) => {
      console.log("addFriends");
      state.friendList.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchUserFriendList.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.friendList = action.payload;
      }
    );
  },
});

//* Action creators are generated for each case reducer function
export const { updateUser, addFriends } = userSlice.actions;

export default userSlice.reducer;
