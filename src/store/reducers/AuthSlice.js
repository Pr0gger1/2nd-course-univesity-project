import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase.config';
import { signOut } from "firebase/auth";

const authSlice = createSlice({
    name: 'authStates',
    initialState: {
        isAuth: localStorage.getItem('isAuth') || false,
        userData: null,
        authError: null
    },
    reducers: {
        async setUser(state, action) {
            state.isAuth = true;
            localStorage.setItem("isAuth", state.isAuth);

            state.userData = action.payload;
            console.log(state.userData)

        },
        async registerHandler(state, action) {
            state.isAuth = true;
            state.userData = action.payload.data;
            state.authError = action.payload.error;
        },
        async loginHandler(state, action) {
            state.isAuth = true;
            state.userData = action.payload.data;
        },
        async logoutHandler(state) {
            await signOut(auth)
                .then(() => {
                    state.isAuth = false;
                    state.userData = null;
                    localStorage.setItem('isAuth', false);
            })
                .catch( error => state.authError = error);
        }
    }
})
export const { setUser, loginHandler, logoutHandler, registerHandler } = authSlice.actions;
export default authSlice.reducer;