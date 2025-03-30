import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: !!localStorage.getItem('pulseToken'),
        memberName: localStorage.getItem('memberName') || 'Pulse Member',
    },
    reducers: {
        login: (state) => {
            state.isAuth = true;
        },
        logout: (state) => {
            state.isAuth = false;
            localStorage.removeItem('pulseToken');
            localStorage.removeItem('memberName');
            localStorage.removeItem('user');
        }
    }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;