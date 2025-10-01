const movieDetails = require('./moviedetails.js');
require('dotenv').config();
const TOKEN = process.env.TOKEN;

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
            const sortedByPopularity = json.results.sort(
                (a, b) => b.popularity - a.popularity
            );

            const filteredIds = sortedByPopularity.map((e) => ({ id: e.id }));

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
            callback(undefined, fetchedData);
        })
        .catch((err) => {
            console.error('Error in movies function:', err);
            callback(err, undefined);
        });
};

module.exports = movies;
