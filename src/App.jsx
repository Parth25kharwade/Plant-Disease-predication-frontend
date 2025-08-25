import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext.jsx';
import LandingPage from "./pages/LandingPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import ExpertsPage from "./pages/ExpertsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import FloatingActionButton from "./components/FloatingActionButton.jsx";

const App = () => {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "465191065067-pejn0lf4jmok2h1r2hbo1ou1f3usmiel.apps.googleusercontent.com"}>
            <AuthProvider>
                <Router>
                    <ScrollProgress />
                    <Navbar />
                    <main className="flex-grow-1">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route path="/result" element={<ResultPage />} />
                            <Route path="/experts" element={<ExpertsPage />} />
                            <Route path="/about" element={<AboutPage />} />
                        </Routes>
                    </main>
                    <FloatingActionButton />
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
};

export default App;