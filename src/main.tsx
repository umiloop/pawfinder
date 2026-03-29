import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Import React Router
import "./index.css"; // Import  styles
import Navbar from "./assets/components/nav-bar/Navbar";
import HomePage from "./home-page/HomePage";
import AdoptPage from "./adopt-page/AdoptPage"; // Import the Adopt Page
import Footer from "./assets/components/footer/Footer";
import ListPetPage from "./list-pet-page/ListPetPage";
import RescuePage from "./rescue-page/RescuePage";
import ReportMissingPetForm from "./assets/components/report-missing-pet-form/ReportMissingPetForm"; // Import the form component
import HealthWellness from "./health & welness page/HealthWellness";
import Donate from "./donate-page/Donate";
import PostPetAdoptionForm from "./assets/components/post-pet-adoption-form/PostPetAdoptionForm";
import RehomePetForm from "./assets/components/rehome-pet-form/RehomePetForm"; 
import UserProfilePage from "./userProfile-page/UserProfilePage";
import FloatingChatButton from "./assets/components/FloatingChatButton/FloatingChatButton";
import ReportStrayPetForm from "./assets/components/report-stray-form/ReportStrayPetForm";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import  Accessibility from "./pages/accessibility/Accessibility";
import Volunteer from "./pages/volunteer/Volunteer";
import Clinics from "./assets/components/clinics/Clinics";
import CheckupsInfo from "./assets/components/chekup info/CheckupsInfo";
import VaccinationInfo from "./assets/components/vaccination info/VaccinationInfo";
import SterilizationBenefits from "./assets/components/articles/sterilization/SterilizationBenefits";
import AdoptDontShop from "./assets/components/articles/adopt-don't shop/AdoptDontShop";
import PhysicalHealthBenefits from "./assets/components/articles/physical-health-benfits/PhysicalHealthBenefits";
// import ProtectedRoute from "./ProtectedRoute";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adopt" element={<AdoptPage />} />
        <Route path="/listpet" element={<ListPetPage />} />
        {/* <Route path="/listpet" element={
          <ProtectedRoute>
            <ListPetPage />
          </ProtectedRoute>}
        /> */}
        <Route path="/list-shelter-pet"  element={<PostPetAdoptionForm />} />
        <Route path="/rehome-pet" element={<RehomePetForm />} />
        <Route path="/rescue" element={<RescuePage/>} />
        <Route path="/report-rescue-pet" element={<ReportStrayPetForm />} /> {/* Add this route */}
        <Route path="/report-missing-pet" element={<ReportMissingPetForm />} /> {/* Add this route */}
        <Route path="/donate" element={ <Donate />}/>
        <Route path="/health" element={ <HealthWellness />}/>
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/sterilization-benefits" element={<SterilizationBenefits />}/> 
        <Route path="/AdoptDontShop" element={<AdoptDontShop />}/> 
        <Route path="/physical-health-benefits" element={<PhysicalHealthBenefits />}/>
        <Route path="/checkups-info" element={<CheckupsInfo />} />
        <Route path="/vaccination-info" element={<VaccinationInfo />} />
        <Route path="/profile" element={<UserProfilePage />}>
        <Route index element={<Navigate to="/profile/my-profile" />} />
        <Route path="my-profile" element={<UserProfilePage section="profile" />} />
        <Route path="adoption-requests" element={<UserProfilePage section="adoption-requests" />} />
        <Route path="listings" element={<UserProfilePage section="listings" />} />
        <Route path="requests-received" element={<UserProfilePage section="requests-received" />} />
        <Route path="rescue" element={<UserProfilePage section="rescue" />} />
        <Route path="missing" element={<UserProfilePage section="missing" />} />
        </Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/accessibility" element={<Accessibility/>} />
        <Route path="/volunteer" element={<Volunteer />} />

        
      </Routes>
      <FloatingChatButton />
      <Footer />
    </Router>
  </StrictMode>
);
