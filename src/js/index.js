import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSubmit(event) {
  event.preventDefault();
  searchQuery = form.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  clearGallery();
  page = 1;
  await fetchImages();
  showLoadMoreButton();
}

async function loadMoreImages() {
  page++;
  await fetchImages();
}

async function fetchImages() {
  const apiKey = '37006271-9ca9ec93e9cdea535f835c12a';
  const perPage = 40;
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.hits.length === 0) {
      showNotification('Sorry, there are no images matching your search query. Please try again.');
      hideLoadMoreButton();
      return;
    }

    data.hits.forEach((image) => {
      createImageCard(image);
    });

    if (data.totalHits <= page * perPage) {
      hideLoadMoreButton();
      showNotification("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error('Error:', error);
    showNotification('An error occurred. Please try again later.');
  }
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('photo-card');

  const imageElement = document.createElement('img');
  imageElement.src = image.webformatURL;
  imageElement.alt = image.tags;
  imageElement.loading = 'lazy';

  const info = document.createElement('div');
  info.classList.add('info');

  const likes = document.createElement('p');
  likes.classList.add('info-item');
  likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

  const views = document.createElement('p');
  views.classList.add('info-item');
  views.innerHTML = `<b>Views:</b> ${image.views}`;

  const comments = document.createElement('p');
  comments.classList.add('info-item');
  comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

  const downloads = document.createElement('p');
  downloads.classList.add('info-item');
  downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  card.appendChild(imageElement);
  card.appendChild(info);

  gallery.appendChild(card);
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
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
