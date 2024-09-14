import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import "./Login.css";
import logopage from "./assets/loginpage.png";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Función para manejar el login
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      // Hacer la petición GET para obtener todos los usuarios
      const response = await fetch(
        "https://66e4ac33d2405277ed14fa73.mockapi.io/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      // Buscar el usuario con el nombre de usuario ingresado
      const user = users.find(
        (user: { username: string; password: string }) =>
          user.username === username
      );

      // Verificar si el usuario existe y la contraseña coincide
      if (user && user.password === password) {
        login(); // Actualizar el estado de autenticación
        navigate("/home"); // Redirigir a /home
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the API");
    }
  };

  return (
    <div className="bg-black w-screen h-screen">
      <div className="flex flex-row p-28">
        <div className="bg-zinc-900 w-1/2 login rounded-l-lg">
          <div className="mx-24 my-10 space-y-12">
            <h1 className="flex justify-center items-center text-white text-3xl font-serif my-10">
              LOGIN
            </h1>
            <div>
              <label className="text-white font-serif">USERNAME</label>
              <input
                type="text"
                className="bg-transparent border-b-2 w-full text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-white font-serif">PASSWORD</label>
              <input
                type="password"
                className="bg-transparent border-b-2 w-full text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                className="bg-violet-700 w-48 h-10 rounded-full"
                onClick={handleLogin}
              >
                LOGIN
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-white mr-2">Don't have an account?</p>
              <Link to="/register">
                <button className="text-violet-700 hover:border-b-2 border-violet-700">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-blue-700 w-1/2 login rounded-r-lg">
          <div className="w-full h-full relative">
            <img
              src={logopage}
              alt="Login Page"
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
