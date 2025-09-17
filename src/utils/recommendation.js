require('dotenv').config();
const TOKEN = process.env.TOKEN;

const recommendation = (movieID, callback) => {
    const url = `https://api.themoviedb.org/3/movie/${movieID}/recommendations'`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: TOKEN,
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err));
};

module.exports = recommendation;
