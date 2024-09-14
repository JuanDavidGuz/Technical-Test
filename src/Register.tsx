import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir después del registro
import "./Register.css";
import logopage from "./assets/loginpage.png";
import { Link } from "react-router-dom";

function Register() {
  // Definir los estados para los campos de entrada
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Hook para la redirección

  // Función para manejar el registro
  const handleRegister = async () => {
    if (
      !name ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill out all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Enviar los datos a MockAPI.io
    try {
      const response = await fetch(
        "https://66e4ac33d2405277ed14fa73.mockapi.io/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            lastname,
            username,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("User registered successfully!");
        console.log("User registered:", data);
        navigate("/"); // Redirige al inicio de sesión después del registro exitoso
      } else {
        alert("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the API");
    }
  };

  return (
    <div className=" bg-black w-screen h-screen">
      <div className=" flex flex-row p-28">
        <div className=" bg-violet-700 w-1/2 login rounded-l-lg">
          <div className=" w-full h-full relative">
            <img
              src={logopage}
              alt="NO"
              className=" inset-0 object-cover w-full h-full rounded-l-lg"
            />
          </div>
        </div>
        <div className=" bg-zinc-900 w-1/2 login rounded-r-lg">
          <div className=" mx-24 my-10 space-y-4">
            <h1 className="flex justify-center items-center text-white text-3xl font-serif">
              REGISTER
            </h1>
            <div>
              <p>Names</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" text-white"
              />
            </div>
            <div>
              <p>Last name</p>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className=" text-white"
              />
            </div>
            <div>
              <p>User name</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className=" text-white"
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" text-white"
              />
            </div>
            <div>
              <p>Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" text-white"
              />
            </div>
            <div>
              <p>Confirm the Password</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" text-white"
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                className="bg-violet-700 w-48 h-10 rounded-full font-serif text-white"
                onClick={handleRegister}
              >
                REGISTER
              </button>
            </div>
            <div className=" flex justify-center">
              <p className=" text-white mr-2">You have an account?</p>
              <Link to={"/"}>
                <button className=" text-violet-700 hover:border-b-2 border-violet-700 font-serif">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
