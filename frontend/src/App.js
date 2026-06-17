import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import AnimalDetailPage from "./pages/AnimalDetailPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SmoothScroll />
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/animal/:slug" element={<AnimalDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <FloatingCTA />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
