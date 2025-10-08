import { useState } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import facebookLogo from "../../assets/images/Signin/facebook.png";
import microsoftLogo from "../../assets/images/Signin/microsoft.png";
import googleLogo from "../../assets/images/Signin/google.png";
import signinImage from "../../assets/images/Signin/signin.jpg";
import { registration, login as loginService } from "../../services/authService";
import { getUserByUsername, getUserByEmail } from "../../services/usersService";
import type { RegistrationDto, LoginDto } from "../../types/Dtos";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
const Signup = () => {
  const { login: login } = useAuth(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

const validateUsername = async () => {
  const username = formData.username.trim();
  if (!username) return;

  if (username.includes("@")) {
    setErrors((prev) => ({
      ...prev,
      username: "Username cannot contain '@'.",
    }));
    return;
  }

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    setErrors((prev) => ({
      ...prev,
      username: "Username is already taken.",
    }));
  }
};

const validateEmail = async () => {
  const email = formData.email.trim();
  if (!email) return;

  if (!email.includes("@") || !email.includes(".")) {
    setErrors((prev) => ({
      ...prev,
      email: "Invalid email format. Must contain '@' and '.'.",
    }));
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setErrors((prev) => ({
      ...prev,
      email: "Invalid email format.",
    }));
    return;
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    setErrors((prev) => ({
      ...prev,
      email: "Email is already registered.",
    }));
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email format. Must contain '@' and '.'.",
        }));
        return;
      }
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, password: "Passwords do not match." }));
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    const registrationDto: RegistrationDto = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    const registeredUser = await registration(registrationDto);

    if (!registeredUser) {
      setErrors((prev) => ({
        ...prev,
        email: "Registration failed. Please try again.",
      }));
      setLoading(false);
      return;
    }

    const loginDto: LoginDto = {
      username: formData.email,
      password: formData.password,
    };

    const token = await loginService(loginDto);
    setLoading(false);

    if (token) {
      const userData = await getUserByEmail(formData.email);
      if(!userData) {
          setErrors((prev) => ({
          ...prev,
          password: "Login failed after registration.",
        }));
        return;
      } 

      login(userData, token.accessToken);
      localStorage.setItem("token", token.accessToken);
      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => (navigate("/")), 1500);
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "Login failed after registration.",
      }));
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden md:flex w-[908px] h-screen relative">
        <img
          src={signinImage}
          alt="Signin"
          className="object-cover w-full mt-[72px]"
          style={{ maxHeight: "calc(110vh - 150px)" }}
        />
      </div>

      <div className="flex-1 flex justify-end items-start pt-30 pr-16 md:pr-50">
        <div className="w-[800px] bg-white p-8 rounded-lg">
          <h2 className="text-gray-900 font-semibold text-3xl leading-[190%] text-center w-full mb-8">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-gray-900 font-semibold text-lg mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full h-[58px] px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-gray-900 font-semibold text-lg mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full h-[58px] px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-900 font-semibold text-lg mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                              onChange={(e) => {
                  if (e.target.value.includes("@")) return; 
                  handleChange(e);
                }}
                onBlur={validateUsername}
                placeholder="Username"
                className={`w-full h-[58px] px-4 border rounded-lg focus:ring-2 ${
                  errors.username ? "border-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-900 font-semibold text-lg mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateEmail}
                placeholder="Email ID"
                className={`w-full h-[58px] px-4 border rounded-lg focus:ring-2 ${
                  errors.email ? "border-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-gray-900 font-semibold text-lg mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full h-[58px] px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-gray-900 font-semibold text-lg mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`w-full h-[58px] px-4 border rounded-lg focus:ring-2 ${
                    errors.password ? "border-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-[183px] h-[48px] bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              {loading ? "Creating..." : "Create Account"}
              {!loading && <ArrowSmallRightIcon className="w-5 h-5" />}
            </button>

            {successMessage && (
              <p className="text-green-600 mt-3 font-medium">{successMessage}</p>
            )}
          </form>

          <div className="mt-8">
            <div className="flex items-center justify-center gap-4 mb-4 text-gray-400">
              <hr className="w-1/2 border-gray-300" />
              <span className="text-sm whitespace-nowrap">Sign up with</span>
              <hr className="w-1/2 border-gray-300" />
            </div>

            <div className="flex gap-10">
              <button
                onClick={() => (window.location.href = "/auth/facebook")}
                className="w-[220px] h-[50px] border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
              >
                <img src={facebookLogo} alt="Facebook" className="w-6 h-6" />
                <span className="text-blue-600">Facebook</span>
              </button>

              <button
                onClick={() => (window.location.href = "/auth/google")}
                className="w-[220px] h-[50px] border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
              >
                <img src={googleLogo} alt="Google" className="w-6 h-6" />
                <span className="text-gray-700">Google</span>
              </button>

              <button
                onClick={() => (window.location.href = "/auth/microsoft")}
                className="w-[220px] h-[50px] border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
              >
                <img src={microsoftLogo} alt="Microsoft" className="w-6 h-6" />
                <span className="text-black">Microsoft</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
