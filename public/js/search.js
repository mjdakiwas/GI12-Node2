const pathArray = window.location.pathname.split('/');
const movieQuery = pathArray.at(-1);

moviesContainer.style.display = 'flex';
moviesContainerTtl.textContent += `Search "${movieQuery}"`;
moviesContainerMsg.textContent = 'Loading...';

// 1. Get 'section' element which will house all movie cards
// 2. For each movie object in the data, create a card
// 3. In the card, render: movie image, title, description, etc. (tbd let me render these first)

function updateControls() {
    pageInfo.textContent = `Page ${currentState.page} of ${currentState.totalPages}`;
    prevBtn.disabled = currentState.page <= 1;
    nextBtn.disabled = currentState.page >= currentState.totalPages;
}

const loadPage = (page = 1) => {
    return fetchData(movieQuery, page)
        .then((result) => {
            currentState.page = result.page;
            currentState.totalPages = result.total_pages;
            moviesContainerMsg.style.display = 'none';
            populateMovieResults(result.movie_details, moviesContainer);
            updateControls();

            const movieCards = document.querySelectorAll('.movie-card'); // couldn't do it with getElementsByClassName. Why?
            console.log(movieCards);
            movieCards.forEach((e, idx) =>
                handleClick(e, idx, result.movie_details)
            );
        })
        .catch((err) => console.log(err));
};

const handleClick = (e, idx, data) => {
    e.addEventListener('click', (e) => {
        console.log(`Clicked on ${data[idx].title}! ID: ${data[idx].id}`);
        window.location.href = `/search/${data[idx].title}/${data[idx].id}`;
    });
};

prevBtn.addEventListener('click', () => {
    if (currentState.page > 1) loadPage(currentState.page - 1);
});

nextBtn.addEventListener('click', () => {
    if (currentState.page < currentState.totalPages)
        loadPage(currentState.page + 1);
});

loadPage();
