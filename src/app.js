/* 
PROJECT PLAN
// ** REMEMBER FIRST: Initialize a Node.js project w/ `npm init -y` **

Static Site 
[✅] Build server API on a port via Express (npm i express)
[✅] In back-end (aka server), send request to TMDB API 
    - Error handle if response doesn't exist
[✅] If response exist, fire off front-end
    - In client-side JS, fetch response from back-end (server)
    - Turn response into readable JSON via response.json() 
    - Loop through JSON response and render each object w/ HTML + CSS

Dynamic Site (w/ user input)
[✅] Get user input
[✅] In back-end (aka server), revise request based on user input
[✅] If response exist, fire off front-end
    - In client-side JS, fetch response from back-end (server)
    - Turn response into readable JSON via response.json()
    - Loop through JSON response and render each object w/ HTML + CSS
[] Fix up CSS
[✅] Reorganize response array based on popularity

(NICE-TO-HAVES)
+ Pagenation
[✅] Cap the movies rendered into pages
[✅] Display buttons/arrows for users to control switching between pages
[✅] Once a button is clicked, render next or previous page
[] Display indicators where 'dots' can be clicked
[] Once a dot is clicked, render the page corresponding to that dot
[] Link buttons and dots

+ Sorting
[] Provide user sort options (i.e., popularity (default), alphabetically)
[] If alphabetically, re-render display alphabetically
[] If popularity, re-render display popularity

+ Filtering
[] ProvideFilter through search response based on:
    - 'Release Date' 
    - 'Rating'
    - 'Number of Votes'
    - 'Genre'
    - 'Country'
    - 'Language'
    - 'Runtime'
    - 'Adult'
[] Filter through search response based on properties above

+ Categorizing
[✅] In separate files under 'utils', make function that fetches movies based on: 
    - 'Now Playing': https://api.themoviedb.org/3/movie/now_playing
    - 'Popular': https://api.themoviedb.org/3/movie/popular
    - 'Top Rated': https://api.themoviedb.org/3/movie/top_rated
    - 'Upcoming': https://api.themoviedb.org/3/movie/upcoming
[✅] In root route, display responses from these functions by default
[] Make each as a clickable option to expand

+ Interaction
[] Make movie cards clickable
[] Once movie card is clicked, redirect user to corresponding route
[] Fetch response from server and render info of selected movie in the route
[] Display recommendated related movies pertaining to the selected movie (https://api.themoviedb.org/3/movie/{movie_id}/recommendations)

+ Result Page
[✅] Originally wasn't an addition I want, but I re-route to another html file after search to display searches
[] In the movie card, add genre, rating, and option to expand overview to a certain extent (contain within movie card)
[] If there's no image, render a placeholder image

+ DEBUG
[] Display no movies found message when no movie is returned
[✅] Display loading... while API render
[✅] Make images of movie cards consistent even if there's none
[] If there's no overview, render that there isn't one in the movie card
*/

const path = require('path');
const express = require('express');
const images = require('./utils/config.js');
const movies = require('./utils/movies.js');
const categories = require('./utils/categories.js');

const app = express();
const port = process.env.PORT || 3000; // using process.env.PORT in case changing which port a deployment server should listen to

// serving up (telling Node what folder/files what to show/use in the route) static files
app.use(express.static(path.join(__dirname, '../public'))); // express.static is a configuration for static file

app.get('', (req, res) => {
    console.log('Server connected to the port');
    res.sendFile(path.join(__dirname, '../public/index'));
});

app.get('/search/:title', (req, res) => {
    console.log('Redirected to results page');
    res.sendFile(path.join(__dirname, '../public/html/search.html'));
});

app.get('/search/:title/:id', (req, res) => {
    console.log('Redirected to results page');
    res.sendFile(path.join(__dirname, '../public/html/movie.html'));
});

const toPosInt = (value, defaultValue) => {
    return parseInt(value) > 0 ? value : defaultValue;
};

app.get('/movies{/:category}', (req, res) => {
    // route storing response from API
    // refer to https://github.com/pillarjs/path-to-regexp for how to structure routes

    if (req.params.category) {
        images((error, img_base_url = '') => {
            if (error) return res.send({ error: 'Error in config' });
            categories(req.params.category, 11, (error, data = {}) => {
                if (error) return res.send({ error: 'Error in categories' });

                const validCategories = [
                    'now_playing',
                    'popular',
                    'top_rated',
                    'upcoming',
                ];
                if (!validCategories.includes(req.params.category)) {
                    return res.send({
                        error: 'Invalid category. Must be: now_playing, popular, top_rated, upcoming',
                    });
                }

                const movieDetails = data.map((e) => {
                    const newE = Object.assign(e, {
                        poster_path: `${img_base_url}${e.poster_path}`,
                    });
                    return newE;
                });

                return res.send(movieDetails);
            });
        });
    }

    // if (!req.query.search)
    //     return res.send({ error: 'You must provide a movie name' });

    if (req.query.search) {
        // Pagenation
        // 1. Get param for page and limit
        // 2. Determine how many movies returned
        // 3. Determine how many pages by dividing returned / limit
        // 4. In client-side JS, implement control

        // NICE-TO-HAVE: Implement client requested limit
        const page = toPosInt(req.query.page, 1);
        // const limit = toPosInt(req.query.limit, 10);

        images((error, img_base_url = '') => {
            if (error) return res.send({ error: 'Error in config' });

            movies(req.query.search, req.query.page, (error, results = {}) => {
                if (error) return res.send({ error: 'Error in movies' });

                results.movie_details = results.movie_details.map((e) => {
                    const newE = Object.assign(e, {
                        poster_path: `${img_base_url}${e.poster_path}`,
                    });
                    return newE;
                });

                // const totalPages = Math.ceil(results.total_results / limit);
                // const data = {
                //     limit,
                //     page: page,
                //     total_pages: totalPages,
                //     ...results,
                // };

                res.send(results);
            });
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
// REMEMBER: To start server, run `node app.js` in the terminal. To stop, CTRL + C. OR! Use nodemon npm package to update server w/ every changes
