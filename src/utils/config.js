// const movies = require('movies.js');

const config = (callback) => {
    const url = 'https://api.themoviedb.org/3/configuration';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNThjMTk5YWE4ZTNmM2QyZjZjMTA3ZTAzNWIyOGYzZiIsIm5iZiI6MTc1NzM1NDkyNi45OTYsInN1YiI6IjY4YmYxYmFlMTU4ZTU2NjkyYTliY2FmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QUQEB9rKOhOYNUVHVc9Z_PdHbMjXZ43u5ktgFq8DHEU'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => callback(undefined, json.images.secure_base_url + json.images.logo_sizes[2]))
        .catch(err => callback(err, undefined));
}

module.exports = config;