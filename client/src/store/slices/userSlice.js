import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    user: {
      username: '',
      token: '',
    },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLevel: (state, { payload }) => {
      state.level = payload.level;
      state.expNextLvl = payload.expNextLvl;
    },
    setExp: (state, { payload }) => {
      state.exp = payload;
    },
    setStat: (state, { payload }) => {
      state.stats[payload] += 1;
    },
  },
});

export const {
  setUser, setLevel, setExp, setStat,
} = userSlice.actions;

export default userSlice.reducer;
