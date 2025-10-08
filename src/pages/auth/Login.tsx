import { useState } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import facebookLogo from "../../assets/images/Signin/facebook.png";
import microsoftLogo from "../../assets/images/Signin/microsoft.png";
import googleLogo from "../../assets/images/Signin/google.png";
import loginImage from "../../assets/images/Signin/Login.jpg";
import { login } from "../../services/authService";
import { getUserByUsername, getUserByEmail } from "../../services/usersService";
import type { LoginDto } from "../../types/Dtos";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ emailOrUsername: "", password: "" });
  };

  const validateUserExists = async () => {
    const value = formData.emailOrUsername.trim();
    if (!value) return;

    try {
      const isEmail = value.includes("@");
      const existingUser = isEmail
        ? await getUserByEmail(value)
        : await getUserByUsername(value);

      if (!existingUser) {
        setErrors((prev) => ({
          ...prev,
          emailOrUsername: "No account found with this email/username.",
        }));
      }
    } catch (error) {
      console.error("Error validating user:", error);
      setErrors((prev) => ({
        ...prev,
        emailOrUsername: "Unable to verify user. Please try again later.",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.emailOrUsername || !formData.password) {
      setErrors({
        emailOrUsername: !formData.emailOrUsername
          ? "Please enter your email or username."
          : "",
        password: !formData.password ? "Please enter your password." : "",
      });
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    const loginDto: LoginDto = {
      username: formData.emailOrUsername,
      password: formData.password,
    };

    try {
      const token = await login(loginDto);

      if (!token) {
        setErrors((prev) => ({
          ...prev,
          password: "Invalid credentials. Please check and try again.",
        }));
        setLoading(false);
        return;
      }

      const userData = formData.emailOrUsername.includes('@') ?
                       await getUserByEmail(formData.emailOrUsername) :
                       await getUserByUsername(formData.emailOrUsername)
      if (!userData) {
        setErrors((prev) => ({
          ...prev,
          emailOrUsername: "User not found or account unavailable.",
        }));
        setLoading(false);
        return;
      }

      loginUser(userData, token.accessToken);
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Login failed:", error);
      setErrors((prev) => ({
        ...prev,
        password:
          "Login failed. Please check your credentials."
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="flex-1 flex justify-start items-center pl-16 md:pl-50">
        <div className="w-[690px] bg-white p-8 rounded-lg flex flex-col items-center gap-6">
          <h2 className="text-gray-900 font-semibold text-3xl text-center leading-[130%] mb-3">
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-gray-900 font-semibold text-lg">
                Email or Username
              </label>
              <input
                type="text"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                onBlur={validateUserExists}
                placeholder="Email or Username"
                className={`w-full h-[58px] px-4 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.emailOrUsername
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.emailOrUsername && (
                <p className="text-red-500 text-sm">{errors.emailOrUsername}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-900 font-semibold text-lg">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className={`w-full h-[58px] px-4 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-[124px] h-[48px] bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 self-start"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowSmallRightIcon className="w-5 h-5" />}
            </button>

            {successMessage && (
              <p className="text-green-600 font-medium mt-2">{successMessage}</p>
            )}
          </form>

          <div className="mt-8 w-full">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <hr className="flex-1 border-gray-300" />
              <span className="text-sm whitespace-nowrap">Sign in with</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <div className="flex gap-4 justify-center">
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
                <span className="text-red-600">Google</span>
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

      <div className="hidden md:flex w-[908px] h-screen relative">
        <img
          src={loginImage}
          alt="Login"
          className="object-cover w-full h-full mt-[72px]"
          style={{ maxHeight: "calc(108vh - 148px)" }}
        />
      </div>
    </div>
  );
};

export default Login;
