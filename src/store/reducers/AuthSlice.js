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

export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async () => {
        await AuthService.loginWithGoogle();
    }
)
export const register = createAsyncThunk(
    'auth/register',
    async data => {
        await AuthService.register(data.email, data.password, data.username);
    }
);

const authSlice = createSlice({
    name: 'authStates',
    initialState: {
        userData: localStorage.getItem('userData') || null,
        authError: null,
        status: undefined
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

            .addCase(loginWithGoogle.pending, state => {
                state.status = 'loading';
            })

            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.status = 'success';
            })

            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.authError = action.error;
                state.status = 'failed';
            })
    }
})

export const { setUser, logoutHandler } = authSlice.actions;
export default authSlice.reducer;