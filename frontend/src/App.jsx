import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import { Toaster } from "react-hot-toast";

function App() {
    return(
        <div className="w-full h-screen flex justify-center items-center bg-primary text-secondary">
            <Toaster position="top-right" />
            <Routes>
			   <Route path="/" element={<HomePage />} />
		    </Routes>
        </div>
		
    )
}

export default App
