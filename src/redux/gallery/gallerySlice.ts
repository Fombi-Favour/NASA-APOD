import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchGalleryData, GalleryData } from '../../services/api';

interface GalleryState {
  data: GalleryData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  data: null,
  isLoading: false,
  error: null,
}

export const fetchGallery = createAsyncThunk('gallery/fetchGallery', async(date?: string) => {
  const response = await fetchGalleryData(date);
  return response;
});

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGallery.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchGallery.fulfilled, (state, action: PayloadAction<GalleryData>) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchGallery.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'An error occurred';
    })
  }
});

export default gallerySlice.reducer;