import axios from 'axios';

async function fetchImages(searchQuery, page, perPage) {
  const apiKey = '37006271-9ca9ec93e9cdea535f835c12a';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    return data.hits;
  } catch (error) {
    console.error('Ошибка:', error);
    throw new Error('Произошла ошибка при получении изображений.');
  }
}

export default fetchImages;
