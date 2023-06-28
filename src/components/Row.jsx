import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft,MdChevronRight} from "react-icons/md"

const Row = ({ title, fetchUrl ,id}) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(fetchUrl).then((res) => {
            setMovies(res.data.results);
        });
    }, [fetchUrl]);

    const slideLeft = () => {
        var slider = document.getElementById('slider'+id);
        slider.scrollLeft = slider.scrollLeft - 400;
    }
    const slideright = () => {
        var slider = document.getElementById("slider"+id);
        slider.scrollLeft = slider.scrollLeft + 400;
    };
    return (
        <div>
            <h2 className=" text-white font-extrabold md:text-2xl lg:text-3xl xl:text-4xl p-4 lg:my-2 mx-2">
                {title}
            </h2>
            <div className="relative flex items-center group ">
                <MdChevronLeft onClick={slideLeft}
                    size={40}
                    className="border-[2px] border-black left-4 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 md:hidden  group-hover:block"
                />
                <div
                    id={"slider"+id}
                    className=" w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth relative "
                >
                    {movies.map((item, id) => (
                        <Movie key={id} item={item} />
                    ))}
                </div>
                <MdChevronRight onClick={slideright}
                    size={40}
                    className=" border-[2px] border-black right-4 bg-white rounded-full absolute opacity-50  hover:opacity-100 cursor-pointer z-10 md:hidden  group-hover:block"
                />
            </div>
        </div>
    );
};

export default Row;
