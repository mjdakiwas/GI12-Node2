require('dotenv').config();
const TOKEN = process.env.TOKEN;

const images = (callback) => {
    const url = 'https://api.themoviedb.org/3/configuration';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: TOKEN,
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) =>
            callback(
                undefined,
                json.images.secure_base_url + json.images.logo_sizes[3]
            )
        )
        .catch((err) => callback(err, undefined));
};

module.exports = images;
