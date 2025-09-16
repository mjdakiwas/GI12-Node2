window.onload = function () {
    const pageCtrl = document.getElementById('page-ctrl');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');

    const pathArray = window.location.pathname.split('/');
    const movieQuery = pathArray.at(-1);

    const currentState = {
        page: 1,
        totalPages: 1,
    };

    moviesContainer.style.display = 'flex';
    moviesContainerTtl.textContent += `Search "${movieQuery}"`;
    moviesContainerMsg.textContent = 'Loading...';

    // 1. Get 'section' element which will house all movie cards
    // 2. For each movie object in the data, create a card
    // 3. In the card, render: movie image, title, description, etc. (tbd let me render these first)

    const fetchData = (page = 1) => {
        return fetch(`/movies?search=${movieQuery}&page=${page}`)
            .then((res) => {
                return res.json();
            })
            .catch((err) => console.log(err));
    };

    function updateControls() {
        pageInfo.textContent = `Page ${currentState.page} of ${currentState.totalPages}`;
        prevBtn.disabled = currentState.page <= 1;
        nextBtn.disabled = currentState.page >= currentState.totalPages;
    }

    const loadPage = (page = 1) => {
        return fetchData(page)
            .then((result) => {
                currentState.page = result.page;
                currentState.totalPages = result.total_pages;
                moviesContainerMsg.style.display = 'none';
                populateMovieResults(result.movie_details, moviesContainer);
                updateControls();
            })
            .catch((err) => console.log(err));
    };

    prevBtn.addEventListener('click', () => {
        if (currentState.page > 1) loadPage(currentState.page - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentState.page < currentState.totalPages)
            loadPage(currentState.page + 1);
    });

    loadPage();
};
