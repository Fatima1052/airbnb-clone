import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./App.css";
import All from "./pages/All";
import ExperiencesPage from "./pages/ExperiencesPage";
import ServicesPage from "./pages/ServicesPage";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/" element={<All/>} />

        <Route path="/homes" element={<HomePage />} />

        <Route path="/experiences" element={<ExperiencesPage />} />

        <Route path="/services" element={<ServicesPage />} />

      </Routes>
   <Footer />
    </BrowserRouter>
  );
}

export default App;