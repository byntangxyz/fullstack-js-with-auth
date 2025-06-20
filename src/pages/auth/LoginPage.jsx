import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // butuh `lucide-react`
import AuthLayout from "../../layout/auth-layout";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.token);
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Login Failed");
      }
    } catch (err) {
      setErrorMessage("Error occured at Login.");
    }
  };

  return (
    <AuthLayout>
      <div className="max-h-screen flex items-center justify-center px-4 pt-16 sm:pt-24">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-white">
            Login to continue
          </h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-400 text-sm text-center mb-4">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have any account yet?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-500 underline"
            >
              Register here.
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
