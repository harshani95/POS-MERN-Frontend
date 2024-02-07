import {configureStore} from '@reduxjs/toolkit';
import ManageSlice from './calc/manageSlice';
export const  store = configureStore({
    reducer:{
        calculator:ManageSlice
    }
});

export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;