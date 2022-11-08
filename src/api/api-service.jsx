const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '30379093-c6893e7e1a44e122606b3a5b3';

function fetchImages(query, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });

  return fetch(`${BASE_URL}/?${searchParams}`).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`There is no image on your request '${query}'`)
    );
  });
}

const api = {
  fetchImages,
};

export default api;