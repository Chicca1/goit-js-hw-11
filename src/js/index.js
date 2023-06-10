import Notiflix from 'notiflix';
import fetchImages from './images';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const searchQuery = form.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  clearGallery();
  await fetchAndDisplayImages(searchQuery);
}

async function fetchAndDisplayImages(searchQuery) {
  const perPage = 40;

  try {
    const images = await fetchImages(searchQuery, 1, perPage);

    if (images.length === 0) {
      showNotification('Извините, по вашему запросу не найдено изображений. Пожалуйста, попробуйте снова.');
      return;
    }

    images.forEach((image) => {
      createImageCard(image);
    });
  } catch (error) {
    console.error('Ошибка:', error);
    showNotification('Произошла ошибка при получении изображений. Пожалуйста, попробуйте ещё раз позже.');
  }
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const template = `
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
    <div class="info">
      <p class="info-item"><b>Лайки:</b> ${image.likes}</p>
      <p class="info-item"><b>Просмотры:</b> ${image.views}</p>
      <p class="info-item"><b>Комментарии:</b> ${image.comments}</p>
      <p class="info-item"><b>Загрузки:</b> ${image.downloads}</p>
    </div>
  `;

  card.innerHTML = template;
  gallery.appendChild(card);
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
