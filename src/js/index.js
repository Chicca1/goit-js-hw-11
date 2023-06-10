import Notiflix from 'notiflix';
import fetchImages from './images.js';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  const searchQuery = form.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  clearGallery();
  await fetchAndDisplayImages(searchQuery);
}

async function handleLoadMore() {
  const searchQuery = form.elements.searchQuery.value.trim();
  const currentPage = gallery.children.length / 40 + 1;
  await fetchAndDisplayImages(searchQuery, currentPage);
}

async function fetchAndDisplayImages(searchQuery, page = 1, perPage = 40) {
  try {
    const images = await fetchImages(searchQuery, page, perPage);

    if (images.length === 0) {
      showNotification('Извините, по вашему запросу не найдено изображений. Пожалуйста, попробуйте снова.');
      return;
    }

    images.forEach((image) => {
      createImageCard(image);
    });

    if (images.length < perPage) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
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
  Notiflix.Notify.failure(message);
}

function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}
