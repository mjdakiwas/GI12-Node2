const form = document.querySelector('form');
const search = document.querySelector('input');
const moviesContainer = document.getElementById('movies-container');
const message = document.querySelector('p');

// import { join } from 'path'; // can't use import statement outside a module

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const movieQuery = search.value;

    message.textContent = 'Loading...';
    moviesContainer.innerHTML = '';

    fetch(`/movies?search=${movieQuery}`).then((res) => {
        // How am I able to fetch from a route in my client-side js?
        res.json().then((movies) => {
            if (movies.length === 0) {
                message.textContent = 'No movies found.';
            } else {
                // 1. Get 'section' element which will house all movie cards
                // 2. For each movie object in the data, create a card
                // 3. In the card, render: movie image, title, description, etc. (tbd let me render these first)
                message.textContent = '';

                moviesContainer.innerHTML += `<h1 class="results-title">Search "${movieQuery}"</h1>`

                console.log(movies);
                movies.forEach((movie) => {
                    moviesContainer.innerHTML += `<div class="movie-card">
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