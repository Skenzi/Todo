import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    user: {
      username: '',
      exp: 0,
    },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLevel: (state, { payload }) => {
      state.user.level = payload.level;
      state.user.expNextLvl = payload.expNextLvl;
    },
    setExp: (state, { payload }) => {
      state.user.exp = payload;
    },
    setStat: (state, { payload }) => {
      state.user.stats[payload] += 1;
    },
  },
});

export const {
  setUser, setLevel, setExp, setStat,
} = userSlice.actions;

export default userSlice.reducer;
