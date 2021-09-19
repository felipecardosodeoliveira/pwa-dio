const params = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

const URL = 'http://localhost:3001/api';

function getNews(subject) {
    return fetch(`${URL}/${subject}`, params)
        .then(resp => resp.json())
        .catch((err) => console.log('Error ', err));
}

function getNewsById(subject, id) {
    return fetch(`${URL}/${subject}/${id}`, params)
        .then(resp => {
            return resp.json()

        })
        .catch((err) => console.log('Error ', err));
}

export default {
    getNews,
    getNewsById
}