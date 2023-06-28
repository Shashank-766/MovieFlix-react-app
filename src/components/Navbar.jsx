import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Auth_context";
const Navbar = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="block sticky top-0 z-[100] ">
            <div className="flex justify-between items-center p-1 sm:p-2  absolute w-full md:px-10 bg-black/40 z-[101]">
                <h1
                    className="text-red-700 text-2xl sm:text-4xl font-bold cursor-pointer text-shadow"
                    onClick={() => navigate("/")}
                >
                    MOVIEFLIX
                </h1>
                {user?.email ? (
                    <div>
                        <Link to="/account">
                            <button className=" text-white pr-4  hover:text-red-600  font-bold ">
                                Account
                            </button>
                        </Link>

                        <button
                            onClick={handleLogOut}
                            className="text-white bg-red-700 p-1 md:px-4 md:py-2 rounded-lg cursor-pointer  hover:bg-red-600 font-bold "
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div>
                        <Link to="/login">
                            <button className=" text-white pr-4  hover:text-red-600 font-bold">
                                Sign In
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="text-white bg-red-700 p-1 md:px-4 md:py-2 rounded-lg cursor-pointer font-bold hover:bg-red-600 ">
                                Sign up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
