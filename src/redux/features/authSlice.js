import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({

    name: 'auth',
    initialState: {
        status: false,
        userData: null,
        authLoading: true,
    },

    reducers: {
        // methords are come here..
        loginSuccess: (state, action) => {
            state.status = true;
            state.userData = action.payload
            state.authLoading = false
        },

        logoutSuccess: (state) => {
            state.status = false;
            state.userData = null;
            state.authLoading = false
        }
    }
})

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;