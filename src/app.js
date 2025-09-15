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
+ Pagenation--Render up to 10 movies of results in a page
[] If response contains more than 10 movies, cap the movies rendered to only be 10 movies
[] Display indicators where 'dots' can be clicked and there are arrows that can be clicked
[] Once a dot is clicked, render the 10 movies corresponding to that dot
[] Once an arrow is clicked, render next or previous 10 movies

+ Filtering
[] In a separate file under 'utils', make a function that filters through search response based on:
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
    res.render('index');
})

app.get('/movies', (req, res) => {
    // route storing response from API
    if (!req.query.search) return res.send({ error: 'You must provide a movie name' });

    images((error, img_base_url = '') => {
        if (error) return res.send({ error: 'Error in config' });

        movies(req.query.search, (error, details = {}) => {
            if (error) return res.send({ error: 'Error in movies' });

            const movieDetails = details.map(e => {
                const newE = Object.assign(e, { poster_path: `${img_base_url}${e.poster_path}` });
                return newE;
            })

            res.send(movieDetails);
        })
    });
})

app.get('/movies/:category', (req, res) => {
    // This route will match both /categories/popular and /categories/popular/
    // If adding '?' after category, it makes the 'category' parameter optional, effectively matching /categories as well
    // Can use a regular expression: '/categories/:id\\/?'.This explicitly matches with or without a trailing slash for a parameter

    if (!req.params.category) return res.send({ error: 'You must provide a category name' });

    // categories.nowPlaying(11, (error, nowPlayingMovies) => {
    //     if (error) return res.send({ error: 'Error in nowPlaying ' });

    //     res.send({ now_playing: [nowPlayingMovies] });
    // })

    images((error, img_base_url = '') => {
        if (error) return res.send({ error: 'Error in config' });
        categories(req.params.category, 11, (error, data = {}) => {
            if (error) return res.send({ error: 'Error in categories' });

            const validCategories = ['now_playing', 'popular', 'top_rated', 'upcoming'];
            if (!validCategories.includes(req.params.category)) {
                return res.send({ error: 'Invalid category. Must be: now_playing, popular, top_rated, upcoming' })
            }

            const movieDetails = data.map(e => {
                const newE = Object.assign(e, { poster_path: `${img_base_url}${e.poster_path}` });
                return newE;
            })

            res.send(movieDetails);
        })
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})
// REMEMBER: To start server, run `node app.js` in the terminal. To stop, CTRL + C. OR! Use nodemon npm package to update server w/ every changes