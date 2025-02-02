import { registerSlice } from './../features/user/registerSlice';
import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers
} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/user/userSlice';
import forgotPasswordReducer from '../features/user/forgotpassSlice';
import registerReduces from '../features/user/registerSlice';
import vaccineRegistrationReduces from '../features/user/vaccineRegistrationSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    login: userReducer,
    forgotPassword: forgotPasswordReducer,
    register: registerReduces,
    vaccineRegistration: vaccineRegistrationReduces
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export let persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
