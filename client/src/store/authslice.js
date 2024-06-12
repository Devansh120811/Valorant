import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authslice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.status = true,
                state.userData = action.payload
        },
        logout: (state) => {
            state.status = false,
                state.userData = null
        },
        setAuthStatus: (state, action) => {
            state.status = action.payload
        }
    }
})
export const { login, logout, setAuthStatus } = authslice.actions
export default authslice.reducer