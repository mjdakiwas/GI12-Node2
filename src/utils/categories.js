// + Categorizing
// [] In separate files under 'utils', make function that fetches movies based on: 
//     - 'Now Playing': https://api.themoviedb.org/3/movie/now_playing
//     - 'Popular': https://api.themoviedb.org/3/movie/popular
//     - 'Top Rated': https://api.themoviedb.org/3/movie/top_rated
//     - 'Upcoming': https://api.themoviedb.org/3/movie/upcoming
// [] In root route, display responses from these functions by default
// [] Make each as a clickable option to expand

const movieDetails = require('./moviedetails.js');


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNThjMTk5YWE4ZTNmM2QyZjZjMTA3ZTAzNWIyOGYzZiIsIm5iZiI6MTc1NzM1NDkyNi45OTYsInN1YiI6IjY4YmYxYmFlMTU4ZTU2NjkyYTliY2FmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QUQEB9rKOhOYNUVHVc9Z_PdHbMjXZ43u5ktgFq8DHEU'
    }
};

const categories = (category, num, callback) => {
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const limitDisplay = json.results.slice(0, num);

            const filteredIds = limitDisplay.map(e => (
                { id: e.id }
            ));

            return Promise.all(filteredIds.map(e => {
                return movieDetails(e.id)
                    .then(details => {
                        return {
                            id: e.id,
                            ...details
                        }
                    })
                    .catch(err => { return { err: 'Error calling movieDetails' } })
            }))
        })
        .then(fetchedData => {
            console.log("Fetched movie details:", fetchedData);
            callback(undefined, fetchedData)
        })
        .catch(err => callback(err, undefined));
}

module.exports = categories;

// const nowPlaying = (num, callback) => {
//     const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

//     fetch(url, options)
//         .then(res => res.json())
//         .then(json => {
//             const limitDisplay = json.results.slice(0, num);

//             callback(undefined, limitDisplay);
//         })
//         .catch(err => callback(err, undefined));
// }

// const popular = () => {
//     const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

//     fetch(url, options)
//         .then(res => res.json())
//         .then(json => console.log(json))
//         .catch(err => console.error(err));
// }

// const topRated = () => {
//     const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

//     fetch(url, options)
//         .then(res => res.json())
//         .then(json => console.log(json))
//         .catch(err => console.error(err));
// }

// const upcoming = () => {
//     const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';

//     fetch(url, options)
//         .then(res => res.json())
//         .then(json => console.log(json))
//         .catch(err => console.error(err));
// }

// module.exports = {
//     nowPlaying,
//     popular,
//     topRated,
//     upcoming
// }