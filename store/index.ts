import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import cartReducer from './reducers/cart';
import userReducer from './reducers/user';
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
} from 'redux-persist'

//COMBINING ALL REDUCERS
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
})

// Create a default store for type inference (server-side version)
const store = configureStore({ 
  reducer: rootReducer,
});

const makeStore = ({ isServer }: { isServer: Boolean }) => {
  if (isServer) {
    //If it's on server side, create a store
    return configureStore({ 
      reducer: rootReducer,
    });
  } else {
    //If it's on client side, create a store which will persist
    const persistConfig = {
      key: "shoppingcart",
      whitelist: ["cart", "user"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

    const clientStore = configureStore({ 
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [
              'persist/PERSIST',
              'persist/REHYDRATE',
              'persist/REGISTER',
              'persist/PAUSE',
              'persist/PURGE',
              'persist/FLUSH',
            ],
          },
        }),
    }); // Creating the store again

    // @ts-ignore:next-line
    clientStore.__persistor = persistStore(clientStore); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return clientStore as any;
  }
};

// export an assembled wrapper
// @ts-ignore:next-line
export const wrapper = createWrapper(makeStore, {debug: true});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch