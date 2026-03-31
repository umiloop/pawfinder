import axios from "axios";

const API_URL = "https://pawfinder-backend.onrender.com/api/pets/reportstray";

export const reportStrayAnimal = async (data: any) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error reporting stray animal:", error);
    throw error.response?.data || "An error occurred";
  }
};
