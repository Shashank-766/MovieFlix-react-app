import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiStar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Auth_context";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ item }) => {
    const [like, setLike] = useState(false);
    const { user,SavedMovies } = UserAuth();
    const userDbId = doc(db, "users", `${user?.email}`);
    const movieRef = doc(db, "users", `${user?.email}`);
    

    const deleteShow = async (passedId) => {
        try {
            const result = SavedMovies?.filter((item) => item.id !== passedId);
            await updateDoc(movieRef, { savedShows: result });
            setLike(false);
        } catch (error) {
            console.log(error);
        }
    };

    const saveShow = async () => {
        if (user?.email) {
            setLike(true);
            await updateDoc(userDbId, {
                savedShows: arrayUnion({
                    id: item?.id,
                    title: item?.title,
                    img1: item?.backdrop_path,
                    img: item?.poster_path,
                }),
            });
        } else {
            alert("Please Log-in to save a movie !! ");
        }
    };

    const navigate = useNavigate();
    const handleClick = () => {
        return navigate("/movie/" + item.title);
    };
   

    const handleLike = () => {
        if (user?.email) {
            SavedMovies?.forEach((movie) => {
                if (movie?.id === item?.id) {
                    setLike(true);
                }
            });
        } else setLike(false);
    };
    
    useEffect(() => {
        handleLike();
    },[SavedMovies]);

    if (item?.poster_path !== null) {
        return (
            <div className=" w-[160px] h-[200px] sm:w-[200px] sm:h-[240px] md:w-[240px] md:h-[280px] lg:w-[260px] lg:h-[300px] inline-block cursor-pointer relative m-2   hover:scale-105 ">
                <img
                    className="object-fill w-full h-full block text-white border border-gray-600 rounded-lg "
                    src={`https://image.tmdb.org/t/p/w342/${item?.poster_path}`}
                    alt={item.title}
                />

                <div className="absolute top-0 left-0 w-full h-full hover:bg-gradient-to-t from-black opacity-0 hover:opacity-100 text-white hover:border-white hover:border hover:rounded-lg ">
                    <div className="whitespace-normal text-ms md:text-base font-extrabold flex flex-col justify-end gap-1 items-center h-full text-center p-1">
                        <div className="md:text-lg">{item?.title}</div>
                        <div className="flex justify-center items-center gap-1 font-bold ">
                            <span>Rating : </span>
                            <HiStar className="fill-yellow-700" fontSize={22} />
                            <span>{item?.vote_average}</span>
                        </div>
                        <span
                            className="mb-4 hover:text-red-700"
                            onClick={handleClick}
                        >
                            Info
                        </span>
                    </div>
                    <p>
                        {like ? (
                            <FaHeart
                                onClick={() => deleteShow(item?.id)}
                                className="absolute top-3 left-3  text-red-600"
                                fontSize={24}
                            />
                        ) : (
                            <FaRegHeart
                                onClick={saveShow}
                                className="absolute top-3 left-3 bg-black/60 rounded-full p-1 text-white"
                                fontSize={28}
                            />
                        )}
                    </p>
                </div>
            </div>
        );
    }
};

export default Movie;
