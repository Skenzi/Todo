import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modalInfo',
    initialState: {
        show: false,
    },
    reducers: {
        setStateModal: (state, { payload }) => {
            console.log(payload)
            state.show = payload;
        }
    }
});

export const { setStateModal } = modalSlice.actions;

export default modalSlice.reducer;