import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase.config';
import { signOut } from "firebase/auth";
import { AuthService } from "../../services/auth.service";

export const login = createAsyncThunk(
    'auth/login',
    async data => {
        await AuthService.login(data.email, data.password);
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async data => {
        await AuthService.register(data.email, data.password);
    }
);
const authSlice = createSlice({
    name: 'authStates',
    initialState: {
        userData: null,
        authError: null,
        status: ''
    },
    
    reducers: {
        setUser(state, action) {
            state.userData = action.payload.data;
            localStorage.setItem("userData",
                JSON.stringify(state.userData));
        },

        async logoutHandler(state) {
            await signOut(auth)
                .then(() => {
                    state.userData = null;
                    localStorage.removeItem("userData");
                    window.location.pathname = '/login';
            })
                .catch( error => state.authError = error);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, state => {
                state.status = 'loading';
            })

            .addCase(login.fulfilled, (state, action) => {
                state.status = 'success';
                state.userData = action.payload;
                window.location.pathname = '/';
            })

            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.authError = action.error;
            })

            .addCase(register.pending, state => {
                state.status = 'loading';
            })

            .addCase(register.fulfilled, (state, action) => {
                state.status = 'success';
                state.userData = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.authError = action.error;
            })
    }
})

export const { setUser, logoutHandler } = authSlice.actions;
export default authSlice.reducer;