import { useAuth } from "./auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const { logout } = useAuth(); // Obtener la función de logout del contexto
  const navigate = useNavigate(); // Hook para redirigir después del logout

  const handleLogout = () => {
    logout(); // Llamar a la función de logout
    navigate("/"); // Redirigir a la página de login
  };

  return (
    <div>
      <div className="bg-zinc-900 w-full h-20 flex justify-between border-b-4 border-violet-700 items-center">
        <h1 className="flex justify-center items-center text-white font-serif ml-8">
          NEXTSHOP
        </h1>
        <Link to={"/home"}>
          <button className="text-white font-serif ">Home</button>
        </Link>
        <button
          className="bg-violet-700 text-white font-serif w-32 py-3  rounded-full mr-8"
          onClick={handleLogout} // Manejar el click del botón
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default Navbar;
