import {configureStore, combineReducers} from "@reduxjs/toolkit"
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist"
import storage from "redux-persist/lib/storage"
import cartReducer from "./cartRedux"
import productsReducer from "./productsRedux"
import userReducer from "./userRedux"




const persistConfig = {
    key: "root",
    version : 1,
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer) 

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    
});

export let persistor = persistStore(store)


