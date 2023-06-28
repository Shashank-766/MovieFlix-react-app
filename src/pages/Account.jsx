import React from "react";
import SavedShows from "../components/SavedShows";
import { UserAuth } from "../context/Auth_context";

const Account = () => {
    const { user } = UserAuth();
    return (
        <div >
            <div className="w-full  text-white">
                <img
                    className="w-full h-[400px] object-fill"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/530fc327-2ddb-4038-a3f0-2da2d9ccede1/9c547c8a-e707-4bdb-bdbc-843f134dd2a6/IN-en-20230619-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="/"
                />
                <div className="bg-gradient-to-r from-black/70 absolute top-0 left-0 w-full h-[400px]"></div>
                <div className="absolute top-[60px] mx-4 my-8 md:mx-10 md:my-12 flex flex-col-reverse gap-4 justify-around">
                    <div className="">
                        <h1 className="text-3xl md:text-6xl font-bold">
                            My Shows
                        </h1>
                    </div>
                    <div className=" ">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            {user?.email}
                        </h1>
                    </div>
                </div>
            </div>
            <SavedShows />
        </div>
    );
};

export default Account;
