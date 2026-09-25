import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./AuthContext";
import { FavoritesProvider } from "./FavoritesContext";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MobileBottomNav from "./Components/MobileBottomNav";

import All from "./pages/All";
import HomePage from "./pages/HomePage";
import ExperiencesPage from "./pages/ExperiencesPage";
import ServicesPage from "./pages/ServicesPage";
import SearchResults from "./pages/SearchResults";
import ListingDetails from "./pages/ListingDetails";
import PhotoGallery from "./pages/PhotoGallery";
import PropertyDetail from "./pages/PropertyDetail";
import ExtraDetails from "./pages/ExtraDetails";
import Checkout from "./pages/Checkout";
import Wishlists from "./pages/Wishlists";
import NotFound from "./pages/NotFound";
import Profile from "./Profile";

const PAGE_TITLES = {
  "/": "Airbnb clone | Vacation rentals, cabins, beach houses & more",
  "/homes": "Homes - Airbnb clone",
  "/experiences": "Experiences - Airbnb clone",
  "/services": "Services - Airbnb clone",
  "/wishlists": "Wishlists - Airbnb clone",
  "/profile": "Profile - Airbnb clone",
};

// Runs on every page change: scroll back to the top (the browser doesn't do
// this by itself in a single-page app) and set the tab title.
function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Detail pages set their own, more specific, title.
    if (PAGE_TITLES[pathname]) document.title = PAGE_TITLES[pathname];
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <RouteEffects />
          <Header />

          {/* Extra space at the bottom on phones so the fixed bottom bar never covers content */}
          <div className="pb-[64px] md:pb-0">
            <Routes>
              <Route path="/" element={<All />} />
              <Route path="/homes" element={<HomePage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/services" element={<ServicesPage />} />

              <Route path="/search" element={<SearchResults />} />
              <Route path="/wishlists" element={<Wishlists />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/listing/:id/photos" element={<PhotoGallery />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route
                path="/experience/:id"
                element={<ExtraDetails kind="experience" />}
              />
              <Route
                path="/service/:id"
                element={<ExtraDetails kind="service" />}
              />
              <Route path="/book/:kind/:id" element={<Checkout />} />

              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
          </div>

          <MobileBottomNav />
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
