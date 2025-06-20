import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../layout/auth-layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // butuh `lucide-react`

const RegisterPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Minimum 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password minimum 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        setServerError("Successfully Register!.");
      } else {
        setServerError(data.message || "Failed to register");
      }
    } catch (err) {
      setServerError("An error occurred while registering.");
    } finally {
      setSubmitting(false);
      navigate("/login");
    }
  };

  return (
    <AuthLayout>
      <div className="max-h-screen flex items-center justify-center px-4 pt-12 sm:pt-24">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-white">
            Register
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                {serverError && (
                  <div className="text-red-400 text-sm mb-4 text-center">
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isSubmitting ? "Memproses..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already has an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-500 underline"
            >
              Login here.
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
