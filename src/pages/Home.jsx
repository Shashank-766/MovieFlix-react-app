import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import requests from "../Requests";
import axios from "axios";
import Row from "../components/Row";

const Home = () => {
    const [genre, setGenre] = useState([]);
    useEffect(() => {
        axios.get(requests.requestGenre).then((res) => {
            setGenre(res.data.genres);
        });
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const rows = genre?.map((item) => {
        return (
            <Row
                key={item.id}
                title={item.name}
                fetchUrl={requests.requestType + item.id + `&page=1`}
                id={item.id+4}
            />
        );
    });
    return (
        <div>
            <Main />
            <Row
                id={0}
                title="Populars Movies"
                fetchUrl={requests.requestPopulars}
            />
            <Row
                id={1}
                title="Trendings Movies"
                fetchUrl={requests.requestTrending}
            />
            <Row
                id={2}
                title="Top-Rated Movies"
                fetchUrl={requests.requestTopRated}
            />
            <Row
                id={3}
                title="Up-Comings Movies"
                fetchUrl={requests.requestUpcoming}
            />
            {rows}
        </div>
    );
};

export default Home;
