import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

// Custom Storage Engine to avoid Vite / ES Module default import issues with redux-persist
const createLocalStorage = () => {
    return {
        getItem(key: string) {
            try {
                return Promise.resolve(window.localStorage.getItem(key));
            } catch (e) {
                return Promise.resolve(null);
            }
        },
        setItem(key: string, value: string) {
            try {
                window.localStorage.setItem(key, value);
                return Promise.resolve(value);
            } catch (e) {
                return Promise.resolve(value);
            }
        },
        removeItem(key: string) {
            try {
                window.localStorage.removeItem(key);
                return Promise.resolve();
            } catch (e) {
                return Promise.resolve();
            }
        },
    };
};

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createLocalStorage() : createNoopStorage();

const rootReducer = combineReducers({
    cart: cartReducer,
    wishlist: wishlistReducer,
});

const persistConfig = {
    key: 'menupro_root',
    version: 1,
    storage,
    whitelist: ['cart', 'wishlist'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
