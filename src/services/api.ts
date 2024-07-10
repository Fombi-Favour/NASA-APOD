const apiKey = process.env.REACT_APP_API_KEY;
const urlData = 'https://api.nasa.gov/planetary/apod';

export interface GalleryData {
  url: string;
  title: string;
  explanation: string;
  date: string;
}

export const fetchGalleryData = async (date?: string): Promise<GalleryData> => {
  if (!apiKey) {
    throw new Error('API key is not set');
  }
  
  const fetch_url = new URL(urlData);
  fetch_url.searchParams.append('api_key', apiKey);
  if (date) {
    fetch_url.searchParams.append('date', date);
  }
  try {
    const response = await fetch(fetch_url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as GalleryData;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || 'Error occurred while fetching data');
    }
    throw new Error('An unexpected error occured');
  }
}