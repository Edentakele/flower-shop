// app/auth/AuthForm.tsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

interface FormData {
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

const AuthForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user", formData);

      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        dispatch({ type: 'SET_USER', payload: data.user }); // Replace with your actual action
        alert("Registration successful");
        // Redirect or update UI as needed
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/authenticate", formData);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        dispatch({ type: 'SET_USER', payload: data.user }); // Replace with your actual action
        alert("Login successful");
        // Redirect or update UI as needed
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up or Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields and form elements */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <hr className="my-6 border-gray-300 w-full" />
        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Input fields and form elements */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
