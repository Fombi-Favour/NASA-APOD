import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import App from './App';

// Define the RootState type based on your actual state structure
type RootState = {
  gallery: {
    data: {
      url: string;
      title: string;
      explanation: string;
      date: string;
    } | null;
    isLoading: boolean;
    error: string | null;
  };
};

// Create a function to create a store with the correct type
const createMockStore = (initialState: RootState) => 
  configureStore({
    reducer: (state = initialState) => state,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });

describe('App Component', () => {
  it('renders loading state', () => {
    const initialState: RootState = {
      gallery: {
        data: null,
        isLoading: true,
        error: null,
      },
    };
    const store = createMockStore(initialState);

    render (
      <Provider store={store}>
        <App />
      </Provider>      
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders NASA Gallery data', () => {
    const initialState: RootState = {
      gallery: {
        data: {
          url: 'https://imageURL.com/image.png',
          title: 'My title',
          explanation: 'Short Description',
          date: '2024-06-10',
        },
        isLoading: false,
        error: null,
      },
    };
    const store = createMockStore(initialState);

    render (
      <Provider store={store}>
        <App />
      </Provider>      
    );

    
    expect(screen.getByText('2024-06-10')).toBeInTheDocument();
    expect(screen.getByText('My title')).toBeInTheDocument();
    expect(screen.getByText('Short Description')).toBeInTheDocument();
    expect(screen.getByAltText('My title')).toHaveAttribute('src', 'https://imageURL.com/image.png');
  })
})