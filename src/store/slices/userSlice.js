import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        username: 'Человек',
        level: 1,
        exp: 0,
        expNextLvl: 100,
    },
    reducers: {
        fetchUserData: (state, { payload }) => {
            state.username = payload.username;
            state.exp = payload.exp;
            state.level = payload.level;
            state.expNextLvl = payload.expNextLvl;
        },
        setLevel: (state, { payload }) => {
            console.log(payload)
            state.level = payload.level;
            state.expNextLvl = payload.expNextLvl;
        },
        setExp: (state, { payload }) => {
            state.exp = payload;
        }
    }
});

export const { fetchUserData, setLevel, setExp } = userSlice.actions;

export default userSlice.reducer;