import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ProductDetail from "./ProducDetail";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<h1>NO VALIDO</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      <Route
        path="/product/:id"
        element={<ProtectedRoute element={<ProductDetail />} />}
      />
    </Routes>
  );
}

export default App;
