import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice"
import dataReducer from "./features/dataSlice"


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "data"]
}

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

const persistor = persistStore(store)

export { store, persistor }