import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import spotifyAuthReducer from './slice/spotifyAuthSlice';
import playerReducer from './slice/playerSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        spotifyAuth: spotifyAuthReducer,
        player: playerReducer,
    }
});