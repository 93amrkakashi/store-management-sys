import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const { signup, error, isLoading } = useSignup();
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, firstName, lastName);
    navigate('/login')
  };

  return (
    <form
      className="signup bg-gray-800 text-white px-8 py-8 rounded"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl mb-4">Sign Up</h3>
      <label className="block mb-2" htmlFor="firstName">
        First Name:
      </label>
      <input
        name="inbut"
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-gray-900"
        id="firstName"
        type="text"
        onChange={(e) => setfirstName(e.target.value)}
        value={firstName}
      />
      <label className="block mb-2" htmlFor="lastName">
        Last Name:
      </label>
      <input
        name="inbut"
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-gray-900"
        id="lastName"
        type="text"
        onChange={(e) => setlastName(e.target.value)}
        value={lastName}
      />
      <label className="block mb-2" htmlFor="email">
        Email address:
      </label>
      <input
        name="inbut"
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-gray-900"
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label className="block mb-2" htmlFor="password">
        Password:
      </label>
      <input
        name="inbut"
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-gray-900"
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isLoading}
        type="submit"
      >
        Sign up
      </button>

      {error && <div className="error mt-4 text-red-500">{error}</div>}
    </form>
  );
};

export default Signup;
