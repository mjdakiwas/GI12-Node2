const movieDetails = require('./moviedetails.js');
require('dotenv').config();
const TOKEN = process.env.TOKEN;

const categories = (category, num, callback) => {
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;

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
            const limitDisplay = json.results.slice(0, num);

            const filteredIds = limitDisplay.map((e) => ({ id: e.id }));

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
            );
        })
        .then((fetchedData) => {
            console.log('Fetched movie details:', fetchedData);
            callback(undefined, fetchedData);
        })
        .catch((err) => callback(err, undefined));
};

module.exports = categories;
