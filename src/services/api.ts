import axios from "axios";

const api_key = process.env.API_KEY;
const url = 'https://api.nasa.gov/planetary/apod';

export const fetchGalleryData = async (date?: string) => {
  try {
    const response = await axios.get(url, {
      params: {
        api_key,
        date,
      },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || 'Error occurred while fetching data');
    }
    throw new Error('An unexpected error occured');
  }
}