// 1. Get movie id
// 2. Use movie id to get movie details
// 3. Get base url + width for img and join w/ poster_path under details

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNThjMTk5YWE4ZTNmM2QyZjZjMTA3ZTAzNWIyOGYzZiIsIm5iZiI6MTc1NzM1NDkyNi45OTYsInN1YiI6IjY4YmYxYmFlMTU4ZTU2NjkyYTliY2FmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QUQEB9rKOhOYNUVHVc9Z_PdHbMjXZ43u5ktgFq8DHEU'
    }
};

// requesting movies' ids in order to use for getMmovieDetails(), which gets specific details about that movie
const movies = function (movie, callback) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}`;

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const sortedByPopularity = json.results.sort((a, b) => b.popularity - a.popularity);

            const filteredIds = sortedByPopularity.map(e => (
                // REMEMBER: .map() allows to make a new array w/ new objects (i.e., mutating original objects in the array)
                { id: e.id }
            ));

            const getMovieDetails = function (movieId) {
                const url = `https://api.themoviedb.org/3/movie/${movieId}`;

                // returning this fetch to ensure that it has a valid promise (not yet resolve or reject) to use in the following .then() in the chain for movies() 
                return fetch(url, options)
                    .then(res => res.json())
                    .then(json => {
                        const filteredProperties =
                        {
                            title: json.title,
                            overview: json.overview,
                            poster_path: json.poster_path,
                            genres: json.genres.map(n => n.name),
                            rating: json.vote_average
                        }
                        return filteredProperties;
                    })
                    .catch(err => {
                        console.error('Error fetching movie details:', err);
                        return { err: 'Error in getMovieDetails' }
                    })
            }

            // Promise.all() ensures all async are completed before proceeding
            return Promise.all(filteredIds.map(e => {
                return getMovieDetails(e.id)
                    .then(details => {
                        return {
                            id: e.id,
                            ...details
                        }
                    })
                    .catch(err => { return { err: 'Error calling getMovieDetails' } })
            }))
        })
        .then(fetchedData => {
            console.log("Fetched movie details:", fetchedData);
            callback(undefined, fetchedData)
        })
        .catch(err => {
            console.error('Error in movies function:', err);
            callback(err, undefined)
        });
}

module.exports = movies;