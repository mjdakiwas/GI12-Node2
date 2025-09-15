const movieDetails = (movieId, callback) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNThjMTk5YWE4ZTNmM2QyZjZjMTA3ZTAzNWIyOGYzZiIsIm5iZiI6MTc1NzM1NDkyNi45OTYsInN1YiI6IjY4YmYxYmFlMTU4ZTU2NjkyYTliY2FmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QUQEB9rKOhOYNUVHVc9Z_PdHbMjXZ43u5ktgFq8DHEU'
        }
    };

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

module.exports = movieDetails;