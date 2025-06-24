import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/CustomerSlice';
import salonReducer from './slices/SalonSlice';
import bookingReducer from './slices/BookingSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

// Load persisted customer info from localStorage
const persistedCustomerInfo = localStorage.getItem('customerInfo')
  ? JSON.parse(localStorage.getItem('customerInfo'))
  : null;

const persistConfig = {
  key : 'root',
  storage,
}

const rootReducer = combineReducers({
  customer: customerReducer,
  salon : salonReducer,
  booking: bookingReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
 reducer : persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
