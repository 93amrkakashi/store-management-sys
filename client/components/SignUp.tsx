import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { firstName, lastName, email, password } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle success, e.g., redirect to a success page
        console.log('Signup successful:', data);
      } else {
        // Handle error, e.g., display error message
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form className="max-w-sm mx-auto bg-gray-800 text-white p-6 rounded-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="firstName">First Name:</label>
        <input
          className="w-full px-3 py-2 bg-gray-700 rounded-md"
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="lastName">Last Name:</label>
        <input
          className="w-full px-3 py-2 bg-gray-700 rounded-md"
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">Email:</label>
        <input
          className="w-full px-3 py-2 bg-gray-700 rounded-md"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="password">Password:</label>
        <input
          className="w-full px-3 py-2 bg-gray-700 rounded-md"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md" type="submit">
        Sign Up
      </button>
    </form>
  );
  
  
};

export default SignUp;
