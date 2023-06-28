import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/Auth_context";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthContextProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/account"
                            element={
                                <ProtectedRoutes>
                                    <Account />
                                </ProtectedRoutes>
                            }
                        />
                        <Route path="/movie/:id" element={<MoviePage />} />
                    </Routes>
                    <Footer />
                </AuthContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
