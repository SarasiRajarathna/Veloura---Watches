import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-primary text-secondary">

      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </div>
  );
}

