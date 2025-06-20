import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layout/app-layout";

const DashboardPage = () => {
  const { token, logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        logout();
        navigate("/");
      });
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center p-6 text-black dark:text-white">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="mb-6">{message}</p>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
