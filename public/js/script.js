const homeBtn = document.getElementById('home__btn');

const nowPlayingContainer = document.getElementById('now-playing__container');
const popularContainer = document.getElementById('popular__container');
const topRatedContainer = document.getElementById('top-rated__container');
const upcomingContainer = document.getElementById('upcoming__container');

const form = document.querySelector('form');
const search = document.querySelector('input');

const moviesContainer = document.getElementById('movies__container');
const moviesContainerTtl = document.getElementById('results-title');
const moviesContainerMsg = document.getElementById('movies__container-message');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

const currentState = {
    page: 1,
    totalPages: 1,
};

homeBtn.addEventListener('click', () => {
    window.location.href = '/';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieQuery = search.value;

    window.location.href = `/search/${movieQuery}`;
});

const fetchData = (movieQuery, page = 1) => {
    return fetch(`/movies?search=${movieQuery}&page=${page}`)
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

function truncateWords(text, limit) {
    const words = text.trim().split(/\s+/);
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return text;
}

const populateMovieResults = (movies, container) => {
    moviesContainer.innerHTML = '';
    movies.map((movie) => {
        container.innerHTML += `<div class="movie-card">
                                                    <div class="movie-card__img-container">
                                                        <img src="${escapeHTML(
                                                            movie.poster_path
                                                        )}" alt="${escapeHTML(
            movie.title
        )} Poster" class="movie-card__poster-img">
                                                    </div>
                                                    <div class="movie-card__info-container">
                                                        <p class="movie-card__title">${escapeHTML(
                                                            movie.title
                                                        )}</p>
                                                        <p class="movie-card__overview">${truncateWords(
                                                            escapeHTML(
                                                                movie.overview
                                                            ),
                                                            25
                                                        )}</p>
                                                    </div>
                                                </div>`;
    });
};

const populateMovieCategories = (movies, container) => {
    movies.map((movie) => {
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

const populateCard = (movie) => {
    return `<div class="movie-card">
                <div class="movie-card__img-container">
                    <img src="${escapeHTML(
                        movie.poster_path
                    )}" alt="${escapeHTML(
        movie.title
    )} Poster" class="movie-card__poster-img">
                </div>
                <div class="movie-card__info-container">
                    <p class="movie-card__title">${escapeHTML(movie.title)}</p>
                    <p class="movie-card__overview">${truncateWords(
                        escapeHTML(movie.overview),
                        25
                    )}</p>
                </div>
            </div>`;
};

const escapeHTML = (str) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};
