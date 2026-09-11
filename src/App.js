import ListingDetails from "./pages/ListingDetails";
import Profile from "./Profile";
import SearchResults from "./pages/SearchResults";
import "./seedListingDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PhotoGallery from "./pages/PhotoGallery";
import "./App.css";

import All from "./pages/All";
import ExperiencesPage from "./pages/ExperiencesPage";
import ServicesPage from "./pages/ServicesPage";

import PropertyDetail from "./pages/PropertyDetail";
import { AuthProvider } from "./AuthContext";
function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>

 {window.location.pathname !== "/search" &&
  !window.location.pathname.startsWith("/listing/") && (
    <Header />
  )}

  <Routes>

        <Route path="/" element={<All/>} />

        <Route path="/homes" element={<HomePage />} />
<Route path="/profile" element={<Profile />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
<Route path="/search" element={<SearchResults />} />
        <Route path="/services" element={<ServicesPage />} />
         <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
    <Route
  path="/listing/:id/photos"
  element={<PhotoGallery />}
/>
      </Routes>

   <Footer />
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;