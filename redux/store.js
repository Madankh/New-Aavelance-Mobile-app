import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userSlice from "./userSlice";
import sellerSlice from "./sellerSlice";
import productRedux from "./productRedux";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { PersistGate } from 'redux-persist/integration/react'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage
  }

  const persistedReducers = persistReducer(persistConfig, userSlice)
  const sellerpersistedReducer = persistReducer(persistConfig, sellerSlice)

export const store =  configureStore({
    reducer:{
        cart: cartReducer,
        user: persistedReducers,
        seller: sellerpersistedReducer,
        product: productRedux,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)