import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import Admin from "./components/Admin";
import Users from "./components/Users";
import MainCharts from "./components/MainCharts";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App w-[100vw]">
      <BrowserRouter>
        <Navbar />
        <div className="pages min-w-full h-[87vh] flex items-center justify-center">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={user ? <Admin /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/users"
              element={user ? <Users /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/charts"
              element={user ? <MainCharts /> : <Navigate to="/login" />}
            />
            <Route
              path="/api/products/:id"
              element={user ? <ProductDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
