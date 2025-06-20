import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GithubIcon } from "lucide-react";

function WelcomePage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="bg-[url(/bg.jpg)] bg-cover flex justify-center min-h-screen p-4 sm:p-6">
      <div className="container max-w-5xl w-full pt-8 bg-blue-950/30 backdrop-blur-md shadow-xl rounded-xl px-4 sm:px-8">
        <header className="text-center text-xl mb-4 flex justify-end flex-wrap gap-3 sm:gap-6">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="px-4 py-2 text-white border border-gray-600 hover:text-gray-300 rounded-md transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-300 hover:text-white border rounded-md transition-colors border-gray-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-gray-300 hover:text-white border rounded-md transition-colors border-gray-600"
              >
                Register
              </Link>
            </>
          )}
        </header>

        <main className="pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-6">
            <img
              src="/react.svg"
              alt="React Logo"
              className="w-28 h-28 sm:w-40 sm:h-40 hover:animate-spin"
            />
            <span className="text-5xl sm:text-7xl">+</span>
            <img
              src="/express-1.svg"
              alt="Express Logo"
              className="w-28 h-28 sm:w-40 sm:h-40 hover:animate-pulse"
            />
          </div>
          <div className="pt-10 sm:pt-12 text-center px-4">
            <h1 className="text-xl sm:text-2xl font-semibold">
              React + Express with Auth Template
            </h1>
            <p className="text-md text-gray-200 mt-2">
              Edit{" "}
              <span className="bg-white/20 backdrop-blur-sm rounded-sm px-1">
                /server
              </span>{" "}
              folder to edit Backend section. And edit{" "}
              <span className="bg-white/20 backdrop-blur-sm rounded-sm px-1">
                /src
              </span>{" "}
              to start editing the Client page (Frontend).
            </p>
            <div className="flex justify-center items-center pt-4 ">
              <a
                href="https://github.com/byntangxyz"
                target="_blank"
                className="border flex justify-center items-center px-2 py-4 rounded-md hover:bg-gray-400/30 hover:backdrop-blur-md"
              >
                <GithubIcon size={30} /> by Fundz
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default WelcomePage;
