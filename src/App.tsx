import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchGallery } from './redux/gallery/gallerySlice';
import { RootState, AppDispatch } from './redux/store';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const App: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector((state: RootState) => state.gallery);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  if(isLoading) {
    return <div className='flex items-center justify-center h-screen'>
      <div className='w-16 h-16 mr-2 border-8 rounded-full border-t-blue-700 animate-spin' />
      <h1 className='text-3xl font-semibold tracking-wider'>Loading!!!</h1>
    </div>
  }

  if(!error) {
    <div className='text-red-500 text-center'>{error}</div>
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">NASA Astronomy Picture of the day</h1>
      <div className="mb-4">
        <DatePicker
        />
      </div>
      {data && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={data.url} alt={data.title} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
            <p className="text-gray-600 mb-2">{data.date}</p>
            <p className="text-gray-800">{data.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
