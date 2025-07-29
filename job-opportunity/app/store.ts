'use client'
import { configureStore } from '@reduxjs/toolkit';
import { opportunityApi } from './services/opportunityApi';

export const store = configureStore({
    reducer: {
        [opportunityApi.reducerPath]: opportunityApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(opportunityApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
