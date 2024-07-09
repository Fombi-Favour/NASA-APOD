import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './gallery/gallerySlice'

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;