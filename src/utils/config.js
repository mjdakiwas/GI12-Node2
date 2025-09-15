// const movies = require('./movies.js');

const images = (callback) => {
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
        .then(json => callback(undefined, json.images.secure_base_url + json.images.logo_sizes[3]))
        .catch(err => callback(err, undefined));
}

// const config = (search, callback) => {
//     images((error, img_base_url = '') => {
//         if (error) return callback(error, undefined);

//         movies(search, (error, details = {}) => {
//             if (error) return callback(error, undefined);

//             const movieDetails = details.map(e => {
//                 const newE = Object.assign(e, { poster_path: `${img_base_url}${e.poster_path}` });
//                 return newE;
//             })

//             callback(undefined, movieDetails);
//         })
//     });
// }

module.exports = images;