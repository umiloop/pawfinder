import axios from "axios";

const BASE_URL = "https://pawfinder-backend.onrender.com/api/users";

// Fetch stray animal report requests by userId
export const getStrayAnimalReportRequestsByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/reportstrayrequests`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stray animal report requests:", error);
    throw error;
  }
};

// Fetch missing pet report requests by userId
export const getMissingPetReportRequestsByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/reportmissingpetsrequests`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching missing pet report requests:", error);
    throw error;
  }
};

// Fetch pet adoption requests by userId
export const getPetAdoptionRequestsByUserId = async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/adoptionrequest`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching pet adoption requests:", error);
      throw error;
    }
};

export const getPetDetails = async (petType: string, petId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/pet-details`, {
            params: {
                petType,
                petId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching pet details:", error);
        throw error;
    }
};

// Fetch rehome pet requests by userId
export const getPetRehomeRequestsByUserId = async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/rehomerequests`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching pet adoption requests:", error);
      throw error;
    }
};


// Fetch shelter pet requests by userId
export const getShelterPetRequestsByUserId = async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/shelterrequests`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching pet adoption requests:", error);
      throw error;
    }
};


