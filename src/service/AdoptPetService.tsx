import axios from "axios";

const BASE_URL = "https://pawfinder-backend.onrender.com/api/pets";
const DEFAULT_PET_IMAGE = "/default-pet.svg";

export const AdoptPetService = {
  getRehomePets: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rehomepetlist`);
      console.log("rehome pet list: ", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching rehome pets:", error);
      return [];
    }
  },

  getApprovedRehomePets: async () => {
    const response = await axios.get(`${BASE_URL}/approved`);
    console.log("API Response for rehome pets:", response.data);
    return response.data.map((pet: any) => ({
      petId: pet.id,
      petName: pet.petName,
      petAge: `${pet.age} ${pet.ageUnit}`,
      petLocation: pet.location,
      petAvailabilityStatus: "Available", // Default or dynamic
      petPicture: pet.photoUrls ? pet.photoUrls[0] : DEFAULT_PET_IMAGE, // Keep first image as main picture
      photoUrls: pet.photoUrls || [DEFAULT_PET_IMAGE], // Add all photo URLs
      petBreed: pet.breed,
      petGender: pet.gender,
      contactPersonNumber: pet.contactNumber,
      userId: pet.userId,
      userName: pet.username || `User ${pet.userId}`, // Fallback to User + ID if username is null
      description: pet.description,
      isShelterPet: false
    }));
  },

  getApprovedShelterPets: async () => {
    const response = await axios.get(`${BASE_URL}/approvedshelterpets`);
    console.log("API Response for shelter pets:", response.data);
    return response.data.map((pet: any) => ({
      petId: pet.id,
      petName: pet.petName,
      petAge: `${pet.age} ${pet.ageUnit}`,
      petLocation: pet.shelterAddress,
      petAvailabilityStatus: "Available", // Default or dynamic
      petPicture: pet.photoUrls && pet.photoUrls.length > 0 ? pet.photoUrls[0] : DEFAULT_PET_IMAGE, // Keep first image as main picture
      photoUrls: pet.photoUrls || [DEFAULT_PET_IMAGE], // Add all photo URLs
      petBreed: pet.breed,
      petGender: pet.gender,
      contactPersonNumber: pet.contactNumber,
      userId: pet.userId,
      userName: pet.username || `User ${pet.userId}`, // Fallback to User + ID if username is null
      description: pet.description || "", // Ensure description is never undefined
      isShelterPet: true
    }));
  },

  getShelterPets: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/shelterpetlist`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shelter pets:", error);
      return [];
    }
  },

  submitAdoptionRequest: async (adoptionData: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/adoptionrequest`, adoptionData);
      console.log("Adoption request submitted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error submitting adoption request:", error);
      throw error;
    }
  }
};
