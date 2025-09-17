const movieDetails = require('./moviedetails.js');
require('dotenv').config();
const TOKEN = process.env.TOKEN;

// requesting movies' ids in order to use for getMovieDetails(), which gets specific details about that movie
const movies = function (movie, page, callback) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&page=${page}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: TOKEN,
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
            // 1. Get movie id
            // 2. Use movie id to get movie details
            // 3. Get base url + width for img and join w/ poster_path under details

            const sortedByPopularity = json.results.sort(
                (a, b) => b.popularity - a.popularity
            );

            const filteredIds = sortedByPopularity.map((e) =>
                // REMEMBER: .map() allows to make a new array w/ new objects
                ({ id: e.id })
            );

            // Promise.all() ensures all async are completed before proceeding
            return Promise.all(
                filteredIds.map((e) => {
                    return movieDetails(e.id)
                        .then((details) => {
                            return {
                                id: e.id,
                                ...details,
                            };
                        })
                        .catch((err) => {
                            return { err: 'Error calling movieDetails' };
                        });
                })
            ).then((results) => ({
                // once Promise.all() is resolved
                page: json.page,
                total_pages: json.total_pages,
                total_results: json.total_results,
                movie_details: results,
            }));
        })
        .then((fetchedData) => {
            // console.log('Fetched movie details:', fetchedData);
            callback(undefined, fetchedData);
        })
        .catch((err) => {
            console.error('Error in movies function:', err);
            callback(err, undefined);
        });
};

module.exports = movies;
