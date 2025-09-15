fetch('movies/now_playing').then((res) => {
    res.json().then((movies) => {
        if (movies.length === 0) {
            console.log('No movies found');
        } else {
            populateMovieCategories(movies, nowPlayingContainer);
        }
    });
});

fetch('movies/popular').then((res) => {
    res.json().then((movies) => {
        if (movies.length === 0) {
            console.log('No movies found');
        } else {
            populateMovieCategories(movies, popularContainer);
        }
    });
});

fetch('movies/top_rated').then((res) => {
    res.json().then((movies) => {
        if (movies.length === 0) {
            console.log('No movies found');
        } else {
            populateMovieCategories(movies, topRatedContainer);
        }
    });
});

fetch('movies/upcoming').then((res) => {
    res.json().then((movies) => {
        if (movies.length === 0) {
            console.log('No movies found');
        } else {
            populateMovieCategories(movies, upcomingContainer);
        }
    });
});
