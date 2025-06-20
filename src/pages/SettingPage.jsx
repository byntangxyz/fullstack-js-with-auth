import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AppLayout from "../layout/app-layout";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { token, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/setting", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) setUsername(data.username);
        else setErrorMsg(data.message);
      } catch {
        setErrorMsg("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChangePassword = async () => {
    setErrorMsg("");
    if (!oldPass || !newPass) {
      return setErrorMsg("Fill all the password.");
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/setting/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass }),
        }
      );

      const data = await res.json();
      if (!res.ok)
        return setErrorMsg(data.message || "Failed changing password.");

      alert("Password successfully changed");
      setOldPass("");
      setNewPass("");
    } catch {
      setErrorMsg("Server error");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/setting/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok)
        return setErrorMsg(data.message || "Cannot delete your account.");

      alert("Account successfully changed");
      logout();
      navigate("/");
    } catch {
      setErrorMsg("Server error");
    }
  };

  return (
    <AppLayout title="Settings">
      <div className="max-w-2xl mx-auto p-4 dark:text-white text-black ">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        {loading ? (
          <p>Fetching data...</p>
        ) : (
          <>
            {errorMsg && (
              <p className="bg-red-500 dark:text-white text-black px-4 py-2 rounded mb-4 text-sm">
                {errorMsg}
              </p>
            )}

            <div className="space-y-10">
              <section>
                <h2 className="text-lg font-semibold mb-2">
                  Account Information
                </h2>
                <div className="bg-gray-800 p-4 rounded-md text-sm">
                  <p className="text-white">
                    Username:{" "}
                    <span className="font-mono text-blue-300">{username}</span>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-2">Change Password</h2>
                <div className="space-y-3 max-w-sm">
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 outline-none text-white"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 outline-none text-white "
                  />
                  <button
                    onClick={handleChangePassword}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white  font-medium transition"
                  >
                    Save
                  </button>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-2">
                  Other Account Action
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded text-white font-medium transition cursor-pointer w-full sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="text-blue-400 border py-2 px-4 rounded cursor-pointer hover:text-blue-500 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
