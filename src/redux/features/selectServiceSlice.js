import { createSlice } from "@reduxjs/toolkit";

const selectServiceSlice = createSlice({
    name: 'selectService',
    initialState: {
        selectService: ''
    },
    reducers: {
        setSelectService: (state, action) => {
            state.selectService = action.payload
        }
    }
})

export const { selectService, setSelectService } = selectServiceSlice.actions;
export default selectServiceSlice.reducer;