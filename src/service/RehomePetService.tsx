import axios from 'axios';

const API_URL = 'https://pawfinder-backend.onrender.com/api/pets/rehomepet'; 
export const submitPetForm = async (formData: FormData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting pet form:', error);
    throw error;
  }
};
