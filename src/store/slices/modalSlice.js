import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modalInfo',
    initialState: {
        show: false,
    },
    reducers: {
        setStateModal: (state, { payload }) => {
            state.show = payload;
        }
    }
});

export const { setStateModal } = modalSlice.actions;

export default modalSlice.reducer;