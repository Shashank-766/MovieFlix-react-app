import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/Auth_context";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SavedShows = () => {
    const { user, SavedMovies } = UserAuth();
    const navigate = useNavigate();

    const slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 400;
    };
    const slideright = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 400;
    };

    const movieRef = doc(db, "users", `${user?.email}`);
    const deleteShow = async (passedId) => {
        try {
            const result = SavedMovies?.filter((item) => item.id !== passedId);
            await updateDoc(movieRef, { savedShows: result });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2 className=" text-white font-extrabold md:text-2xl lg:text-3xl xl:text-4xl p-4 lg:my-2 mx-2">
                {"Movies"}
            </h2>
            <div className="relative flex items-center group ">
                <MdChevronLeft
                    onClick={slideLeft}
                    size={40}
                    className="border-[2px] border-black left-4 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 md:hidden  group-hover:block"
                />
                <div
                    id={"slider"}
                    className=" w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth relative "
                >
                    {SavedMovies.map((item, id) => (
                        <div
                            key={id}
                            className=" w-[160px] h-[200px] sm:w-[200px] sm:h-[240px] md:w-[240px] md:h-[280px] lg:w-[260px] lg:h-[300px] inline-block cursor-pointer relative m-2   hover:scale-105 "
                        >
                            <img
                                className="object-fill w-full h-full block text-white border border-gray-600 rounded-lg "
                                src={`https://image.tmdb.org/t/p/w342/${item?.img}`}
                                alt="/"
                            />

                            <div className="absolute top-0 left-0 w-full h-full hover:bg-gradient-to-t from-black opacity-0 hover:opacity-100 text-white hover:border-white hover:border hover:rounded-lg ">
                                <div className="whitespace-normal text-ms md:text-base font-extrabold flex flex-col justify-end gap-1 items-center h-full text-center p-1 pb-14">
                                    <div
                                        className="md:text-lg hover:text-red-600"
                                        onClick={() => {
                                            navigate("/movie/" + item?.title);
                                        }}
                                    >
                                        {item?.title}
                                    </div>
                                </div>
                                <p
                                    onClick={() => deleteShow(item?.id)}
                                    className="absolute text-black top-3 right-3 hover:text-red-600 "
                                >
                                    <AiOutlineClose size={24} />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <MdChevronRight
                    onClick={slideright}
                    size={40}
                    className=" border-[2px] border-black right-4 bg-white rounded-full absolute opacity-50  hover:opacity-100 cursor-pointer z-10 md:hidden  group-hover:block"
                />
            </div>
        </div>
    );
};

export default SavedShows;
