import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HiStar } from "react-icons/hi";
import { FcLike } from "react-icons/fc";

const MoviePage = () => {
    const [movie, setMovies] = useState([]);
    const id = useParams();
    useEffect(() => {
        axios.get(requests.requestMovie + id.id).then((res) => {
            setMovies(res.data.results[0]);
        });
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="text-white flex flex-col">
            <div className=" absolute w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] bg-gradient-to-r from-black "></div>
            <img
                className=" w-full h-[30vh] sm:h-[40vh] md:h-[50bh] lg:h-[60vh] object-fill bg-center "
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                alt={movie?.title}
            />
            <div className="flex p-4 sm:p-6 md:p-8 lg:p-12 ">
                <div className=" w-[50vw] h-[54vh] mr-2 sm:w-[45vw] sm:h-[75vh] md:w-[40vh] md:h-[90vh] lg:w-[32vw] lg:h-[95vh] xl:w-[25vw] xl:h-[75vh]">
                    <img
                        className="object-fill w-full h-full text-white border border-gray-600 rounded-lg"
                        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                        alt={movie?.title}
                    />
                </div>
                <div className="flex flex-col w-[70%]  px-4 ">
                    <span className="flex font-bold text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-7xl sm:mt-1 md:mt-2 lg:mt-3 xl:mt-4">
                        {movie?.title}
                    </span>
                    <span className="flex text-xs sm:text-sm md:text-lg">
                        Original Language &nbsp;:&nbsp;&nbsp;
                        {movie?.original_language}
                    </span>
                    <div className="flex  gap-1 text-xs sm:text-sm md:text-lg  ">
                        <span>Rating : </span>
                        <HiStar className="fill-yellow-800" fontSize={22} />
                        <span>{movie?.vote_average}</span>
                    </div>
                    <div className="flex  gap-1  text-xs sm:text-sm md:text-lg">
                        <span>Likes : </span>
                        <FcLike fontSize={22} />
                        <span>{movie?.vote_count}</span>
                    </div>
                    <span className="font-bold text-xs text-gray-500 sm:text-lg md:text-xl lg:text-2xl">
                        overview :
                    </span>
                    <p className=" mb-3  text-gray-300 text-xs sm:text-sm md:text-lg lg:text-xl">
                        {movie?.overview}
                    </p>
                    <span className="text-xs text-gray-600 sm:text-sm md:text-lg">
                        Released Date : {movie?.release_date}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;
