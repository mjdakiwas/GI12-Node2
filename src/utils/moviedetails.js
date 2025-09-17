require('dotenv').config();
const TOKEN = process.env.TOKEN;

const movieDetails = (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: TOKEN,
        },
    };

    // returning this fetch to ensure that it has a valid promise (not yet resolve or reject) to use in the following .then() in the chain for movies()
    return fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
            const filteredProperties = {
                title: json.title,
                overview: json.overview,
                poster_path: json.poster_path,
                genres: json.genres.map((n) => n.name),
                rating: json.vote_average,
            };
            return filteredProperties;
        })
        .catch((err) => {
            console.error('Error fetching movie details:', err);
            return { err: 'Error in getMovieDetails' };
        });
};

module.exports = movieDetails;
