import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { User } from "@/types/user.type";
import { getCurrentUser } from "@/services/user.service";

interface AuthState {
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (token: string, { rejectWithValue }) => {
    try {
      return getCurrentUser(token);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error fetching user");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = true;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
