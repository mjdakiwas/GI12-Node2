window.onload = function () {
    const pathArray = window.location.pathname.split('/');
    const movieQuery = pathArray.at(-1);

    fetch(`/movies?search=${movieQuery}`).then((res) => {
        // How am I able to fetch from a route in my client-side js?
        res.json().then((movies) => {
            // 1. Get 'section' element which will house all movie cards
            // 2. For each movie object in the data, create a card
            // 3. In the card, render: movie image, title, description, etc. (tbd let me render these first)
            moviesContainerMsg.textContent = '';

            moviesContainer.style.display = 'flex';
            moviesContainer.innerHTML += `<h1 class="results-title">Search "${movieQuery}"</h1>`;

            if (movies.length === 0) {
                moviesContainerMsg.textContent = 'No movies found';
            } else {
                populateMovieResults(movies, moviesContainer);
            }
        });
    });
};
