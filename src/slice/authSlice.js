import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
    },
    reducers: {
        login: (state) => {
            state.isAuth = true;
        },
        logout: (state) => {
            axios.post(`${VITE_BASE_URL}/v2/logout`);
            state.isAuth = false;
            localStorage.removeItem('Token');
        }
    }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;