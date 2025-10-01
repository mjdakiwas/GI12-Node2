const pathArray = window.location.pathname.split('/');
const movieTitle = pathArray.at(-2);
const movieID = Number(pathArray.at(-1));

document.title = movieTitle;

const movieOverview = document.getElementById('movie-overview__container');
const movieRecommendation = document.getElementById(
    'movie-recommendation__container'
);

fetchData(movieTitle, currentState.page).then((result) => {
    const movieDetail = result.movie_details.filter((e) => e.id === movieID);
    const movie = movieDetail[0];

    movieOverview.innerHTML += `
    <div class="movie-overview__img-container">
        <img src="${movie.poster_path}" class="movie-overview__img" alt="${
        movie.title
    } Poster">
    </div>
    <div class="movie-overview__info-container">
        <p class="movie-overview__title">${movie.title}</p>
        <p class="movie-overview__genre">${movie.genres.join(', ')}</p>
        <p class="movie-overview__overview">${movie.overview}</p>
        <p class="movie-overview__rating">${movie.rating.toFixed(1)}</p>
    </div>`;
});
