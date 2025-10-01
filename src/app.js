const path = require('path');
const express = require('express');
const images = require('./utils/config.js');
const movies = require('./utils/movies.js');
const categories = require('./utils/categories.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

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

    if (req.query.search) {
        const page = toPosInt(req.query.page, 1);

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

                res.send(results);
            });
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
