import { configureStore } from "@reduxjs/toolkit";
import {formData} from "./component/Redux/formData"
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistStore,persistReducer } from "redux-persist";
const  persistConfig ={
    key :'root',
    version :1,
    storage,
    blscklist:[]
}
const reducers = combineReducers(formData)
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer : persistedReducer
}) 
export const persistor = persistStore(store)