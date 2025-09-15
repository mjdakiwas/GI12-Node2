const nowPlayingContainer = document.getElementById('now-playing__container');
const popularContainer = document.getElementById('popular__container');
const topRatedContainer = document.getElementById('top-rated__container');
const upcomingContainer = document.getElementById('upcoming__container');

const form = document.querySelector('form');
const search = document.querySelector('input');
const moviesContainer = document.getElementById('movies__container');
const message = document.getElementById('message');

// import { join } from 'path'; // NOTE: can't use import statement outside a module

fetch('movies/now_playing').then((res) => {
    res.json().then((movies) => {
        if (movies.length === 0) {
            console.log('No movies found');
        } else {
            populateMovieCategories(movies, nowPlayingContainer);
        }
    })
})

fetch('movies/popular').then((res) => {
    res.json().then((movies) => {
        if (movies.length === 0) {
            console.log('No movies found');
        } else {
            populateMovieCategories(movies, popularContainer);
        }
    })
})

fetch('movies/top_rated').then((res) => {
    res.json().then((movies) => {
        if (movies.length === 0) {
            console.log('No movies found');
        } else {
            populateMovieCategories(movies, topRatedContainer);
        }
    })
})

fetch('movies/upcoming').then((res) => {
    res.json().then((movies) => {
        if (movies.length === 0) {
            console.log('No movies found');
        } else {
            populateMovieCategories(movies, upcomingContainer);
        }
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const movieQuery = search.value;

    document.querySelector('h1').style.display = 'none';
    document.querySelectorAll('h2').forEach(e => e.style.display = 'none');
    nowPlayingContainer.style.display = 'none';
    popularContainer.style.display = 'none';
    topRatedContainer.style.display = 'none';
    upcomingContainer.style.display = 'none';

    message.textContent = 'Loading...';
    moviesContainer.innerHTML = '';

    fetch(`/movies?search=${movieQuery}`).then((res) => {
        // How am I able to fetch from a route in my client-side js?
        res.json().then((movies) => {
            // 1. Get 'section' element which will house all movie cards
            // 2. For each movie object in the data, create a card
            // 3. In the card, render: movie image, title, description, etc. (tbd let me render these first)
            message.textContent = '';

            moviesContainer.style.display = 'flex';
            moviesContainer.innerHTML += `<h1 class="results-title">Search "${movieQuery}"</h1>`

            if (movies.length === 0) {
                message.textContent = 'No movies found';
            } else {
                populateMovieResults(movies, moviesContainer);
            }
        })
    })
})

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
                                                        <img src="${movie.poster_path}" alt="${movie.title} Poster" class="movie-card__poster-img">
                                                    </div>
                                                    <div class="movie-card__info-container">
                                                        <p class="movie-card__title">${movie.title}</p>
                                                        <p class="movie-card__overview">${truncateWords(movie.overview, 25)}</p>
                                                    </div>
                                                </div>`;
    })
}

const populateMovieCategories = (movies, container) => {
    movies.forEach((movie) => {
        container.innerHTML += `<div class="movie-card--category">
                                                    <div class="movie-card__img-container--category">
                                                        <img src="${movie.poster_path}" alt="${movie.title} Poster" class="movie-card__poster-img--category">
                                                    </div>
                                                    <div class="movie-card__info-container--category">
                                                        <p class="rating--category"><i class="material-symbols-outlined">star</i>${movie.rating.toFixed(1)}</p>
                                                        <p class="movie-card__title--category">${movie.title}</p>
                                                        <p class="genres--category">${movie.genres.join(', ')}</p>
                                                    </div>
                                                </div>`;
    })
}