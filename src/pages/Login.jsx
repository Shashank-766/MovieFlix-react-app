import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/Auth_context';

const Login = () => {
    const { logIn } = UserAuth();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logIn(email, password);
            navigate("/");
            setError("")
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };
  return (
      <>
          <div className="w-full h-[95.81vh]">
              <img
                  className="hidden sm:block w-full h-full object-fill"
                  src="https://assets.nflxext.com/ffe/siteui/vlv3/530fc327-2ddb-4038-a3f0-2da2d9ccede1/9c547c8a-e707-4bdb-bdbc-843f134dd2a6/IN-en-20230619-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                  alt="/"
              />
              <div className="bg-black/40 fixed top-0 left-0 w-full h-screen"></div>
              <div className="fixed top-0 w-full px-4 py-24 z-50 rounded-3xl">
                  <div className="max-w-[450px] h-[70vh] mx-auto bg-black/75 text-white rounded-[2rem] ">
                      <div className="max-w-[320px] mx-auto py-14 ">
                          <h1 className="text-3xl font-extrabold">Sign In</h1>
                          {error ? (
                              <p className="flex justify-center  p-1 bg-red-500 mt-2">
                                  {error}
                              </p>
                          ) : null}
                          <form
                              onSubmit={handleSubmit}
                              className="w-full flex flex-col py-4"
                          >
                              <input
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="p-3 my-3 bg-gray-800 rounded-xl focus:outline-none"
                                  type="email"
                                  placeholder="E-mail"
                                  autoComplete="email"
                              />
                              <input
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="p-3 my-3 bg-gray-800 rounded-xl focus:outline-none"
                                  type="password"
                                  placeholder="Password"
                                  autoComplete="current-password"
                              />
                              <button className="bg-red-700 p-2 my-6 rounded-xl font-bold hover:bg-red-600">
                                  Sign In
                              </button>
                              <div className="flex justify-between items-center text-sm text-gray-500 px-2">
                                  <p>
                                      <input type="checkbox" className="mr-2" />
                                      Remember Me
                                  </p>
                                  <p>Need Help?</p>
                              </div>
                              <p className="px-2 py-3 flex justify-center items-center gap-2">
                                  <span className="text-gray-500 text-sm">
                                      New To MovieFlix ?{" "}
                                  </span>
                                  <Link to="/signup">Sign Up</Link>
                              </p>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}

export default Login