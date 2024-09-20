/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSignInUserMutation } from "@/redux/api/baseApi";
import { setLoading, setToken, setUser } from "@/redux/feautures/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    termsError: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear errors as the user starts typing
    setErrors({
      ...errors,
      [`${name}Error`]: "",
    });
  };

  const [signIn,{isLoading}] = useSignInUserMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formValid = true;

    // Validation 
    if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: 'Please enter a valid email address.',
      }));
      formValid = false;
    }

    if (formData.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: 'Password must be at least 8 characters long.',
      }));
      formValid = false;
    }

    if (!formData.termsAccepted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        termsError: 'You must accept the Terms and Conditions.',
      }));
      formValid = false;
    }

    // form submission
    if (formValid) {
      
      try {
        const result = await signIn({ email: formData.email, password: formData.password }).unwrap();
        
        toast.success(result.message)
        dispatch(setUser(result.data)); 
        dispatch(setToken(result.token)); 
        dispatch(setLoading(isLoading))
        navigate(`/${result.data.role}`)

      } catch (err:any) {
        toast.error(err.data.message)
        console.error('Failed to sign in:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sign In
        </h1>

        <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.emailError && (
                <p className="text-red-500 text-sm">{errors.emailError}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.passwordError && (
                <p className="text-red-500 text-sm">{errors.passwordError}</p>
              )}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mr-2"
                />
                I accept the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Terms and Conditions
                </a>
              </label>
              {errors.termsError && (
                <p className="text-red-500 text-sm">{errors.termsError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 underline">
              Sign In Instead
            </Link>
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <Link to="/#" className="mr-4 underline">
            Privacy Policy
          </Link>
          <Link to="/#" className="underline">
            Terms of Service
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default SignIn;
