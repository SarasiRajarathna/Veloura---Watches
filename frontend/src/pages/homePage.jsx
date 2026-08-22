import Header from "../components/home/header";
import Hero from "../components/home/hero";
import Footer from "../components/home/footer";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./loginPage";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />

      <main className="w-full flex-1">
        <Routes>
         <Route path="/" element={<Hero/>} />
         <Route path="/login" element={<LoginPage/>} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}
