const key = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=`,
    requestPopulars: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&page=1`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&page=1`,
    requestGenre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`,
    requestType: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=revenue.desc&with_genres=`,
    requestMovie: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=`,
};

export default requests;
