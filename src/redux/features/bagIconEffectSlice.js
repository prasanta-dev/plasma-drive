import { createSlice } from "@reduxjs/toolkit";

const bagIconEffectSlice = createSlice({
    name: 'bagIconEffect',
    initialState: {
        bagIconState: false
    },
    reducers: {
        setBagIconState: (state, action) => {
            state.bagIconState = action.payload
        }
    }
})


export const { bagIconState, setBagIconState } = bagIconEffectSlice.actions;
export default bagIconEffectSlice.reducer;