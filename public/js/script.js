const homeBtn = document.getElementById('home__btn');

const nowPlayingContainer = document.getElementById('now-playing__container');
const popularContainer = document.getElementById('popular__container');
const topRatedContainer = document.getElementById('top-rated__container');
const upcomingContainer = document.getElementById('upcoming__container');

const form = document.querySelector('form');
const search = document.querySelector('input');
const moviesContainer = document.getElementById('movies__container');
const moviesContainerMsg = document.getElementById('movies__container-message');

// import { join } from 'path'; // NOTE: can't use import statement outside a module

homeBtn.addEventListener('click', () => {
    window.location.href = '/'; // This will trigger the Express route
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieQuery = search.value;

    window.location.href = `/search/${movieQuery}`;

    document.querySelector('h1').style.display = 'none';
    document.querySelectorAll('h2').forEach((e) => (e.style.display = 'none'));
    // nowPlayingContainer.style.display = 'none';
    // popularContainer.style.display = 'none';
    // topRatedContainer.style.display = 'none';
    // upcomingContainer.style.display = 'none';

    moviesContainerMsg.textContent = 'Loading...';
    moviesContainer.innerHTML = '';
});

function truncateWords(text, limit) {
    const words = text.trim().split(/\s+/);
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return text;
}

const populateMovieResults = (movies, container) => {
    movies.forEach((movie) => {
        container.innerHTML += `<div class="movie-card">
                                                    <div class="movie-card__img-container">
                                                        <img src="${
                                                            movie.poster_path
                                                        }" alt="${
            movie.title
        } Poster" class="movie-card__poster-img">
                                                    </div>
                                                    <div class="movie-card__info-container">
                                                        <p class="movie-card__title">${
                                                            movie.title
                                                        }</p>
                                                        <p class="movie-card__overview">${truncateWords(
                                                            movie.overview,
                                                            25
                                                        )}</p>
                                                    </div>
                                                </div>`;
    });
};

const populateMovieCategories = (movies, container) => {
    movies.forEach((movie) => {
        container.innerHTML += `<div class="movie-card--category">
                                                    <div class="movie-card__img-container--category">
                                                        <img src="${
                                                            movie.poster_path
                                                        }" alt="${
            movie.title
        } Poster" class="movie-card__poster-img--category">
                                                    </div>
                                                    <div class="movie-card__info-container--category">
                                                        <p class="rating--category"><i class="material-symbols-outlined">star</i>${movie.rating.toFixed(
                                                            1
                                                        )}</p>
                                                        <p class="movie-card__title--category">${
                                                            movie.title
                                                        }</p>
                                                        <p class="genres--category">${movie.genres.join(
                                                            ', '
                                                        )}</p>
                                                    </div>
                                                </div>`;
    });
};
