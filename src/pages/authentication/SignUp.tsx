import { useSignUpUserMutation } from "@/redux/api/baseApi";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signUpUser] = useSignUpUserMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    termsError: "",
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formValid = true;

    // Validation checks
    if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Please enter a valid email address.",
      }));
      formValid = false;
    }

    if (formData.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Password must be at least 8 characters long.",
      }));
      formValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "Passwords do not match.",
      }));
      formValid = false;
    }

    if (!formData.termsAccepted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        termsError: "You must accept the Terms and Conditions.",
      }));
      formValid = false;
    }

    // If form is valid, proceed with the submission
    if (formValid) {
      console.log("Form Submitted:", formData);
      try {
        const res = await signUpUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phoneNumber,
        }).unwrap();
        if (res.success) {
          toast.success(res.message);
          navigate(`/sign-in`);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message);
        console.log(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sign Up
        </h1>

        <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

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

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[55%] right-5 cursor-pointer"
              />
              <input
                type={`${showPassword ? "text" : "password"}`}
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.confirmPasswordError && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPasswordError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number (optional)
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
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
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 underline">
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

export default SignUp;
