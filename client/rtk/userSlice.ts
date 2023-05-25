// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  email: string;
  token: string;
  firstName: string;
  lastName: string;
}

const initialState: UserState = {
  id: '',
  email: '',
  token: '',
  firstName: '',
  lastName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
