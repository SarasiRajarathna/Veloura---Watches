import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/signUpPage";
import AdminPage from "./pages/adminPage";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-primary text-secondary">
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/user/*" element={<CustomerPage />} />
      </Routes>
    </div>
  );
}
