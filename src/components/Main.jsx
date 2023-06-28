import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../context/Auth_context";
const Main = () => {
    const [movies, setMovies] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(requests.requestPopular + `${Math.ceil(Math.random() * 3)}`)
            .then((res) => {
                setMovies(res.data.results);
            });
    }, []);
    const movie = movies[Math.floor(Math.random() * movies?.length)];
    const truncateString = (str, num) => {
        return str?.length > num ? str.slice(0, num) + "..." : str;
    };
    const handleClick = () => {
        return navigate("/movie/" + movie?.title);
    };

    const { user } = UserAuth();
    const userDbId = doc(db, "users", `${user?.email}`);
    const saveShow = async () => {
        if (user?.email) {
            await updateDoc(userDbId, {
                savedShows: arrayUnion({
                    id: movie?.id,
                    title: movie?.title,
                    img1: movie?.backdrop_path,
                    img: movie?.poster_path,
                }),
            });
        } else {
            alert("Please Log-in to save a movie !! ");
        }
    };

    // console.log(movie);

    return (
        <div className=" w-full h-[550px] text-white ">
            <div className="w-full h-full">
                <div className=" absolute w-full h-[550px] bg-gradient-to-r from-black/90 "></div>
                <img
                    className=" w-full h-full object-fill bg-center "
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    alt={movie?.title}
                />
                <div className="absolute w-full top-[140px] pl-4 md:pl-8 lg:pl-12 xl:pl-16">
                    <h1 className=" text-3xl md:text-5xl font-bold w-[90%] md:max-w-[70%] lg:max-m-[50%] ">
                        {movie?.title}
                    </h1>
                    <div className="my-4">
                        <button
                            className="border bg-gray-300 text-black border-gray-900 py-2 px-10  rounded-2xl font-extrabold hover:scale-105 hover:bg-gray-100 transition-all duration-500 delay-150"
                            onClick={handleClick}
                        >
                            Info
                        </button>
                        <button
                            onClick={saveShow}
                            className="border text-white border-gray-300 py-2 px-5 ml-4 rounded-2xl font-extrabold hover:scale-105 hover:text-gray-400 transition-all duration-500 delay-150"
                        >
                            Watch Later
                        </button>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Released : {movie?.release_date}
                    </p>
                    <p className=" mt-4 w-[90%] md:max-w-[70%] lg:max-m-[50%]  xl:max-w-[35%] text-gray-200">
                        {truncateString(movie?.overview, 200)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
