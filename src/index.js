import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';
const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const key = '33287723-ac3e9d0bf292ee3d9e11c0a66';
let totalHitsVar;
let page;
let something = new SimpleLightbox('.gallery a');
const loadPictures = async q => {
  try {
    let response = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    let resp = await response.json();
    console.log(resp);
    let picturesArray = resp.hits;
    totalHitsVar = resp.totalHits;
    console.log(picturesArray);
    displayPictures(picturesArray);
    if (page === 1)
      Notiflix.Notify.success(`Hooray! We found ${totalHitsVar} images.`);
    if (totalHitsVar > 40 && picturesArray.length >= 40)
      loadBtn.style.visibility = 'visible';
    else loadBtn.style.visibility = 'hidden';
    something.refresh();
  } catch {
    error => console.log(error);
  }
};

const displayPictures = pictures => {
  if (pictures.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const htmlString = pictures
    .map(pic => {
      return `
      <div class="photo-card">
      <a href='${pic.largeImageURL}'>
<img src="${pic.webformatURL}" alt="${pic.tags}" loading="lazy" /></a>
<div class="info">
  <p class="info-pic">
    <b>Likes</b>
    ${pic.likes}
  </p>
  <p class="info-pic">
    <b>Views</b>
    ${pic.views}
  </p>
  <p class="info-pic">
    <b>Comments</b>
    ${pic.comments}
  </p>
  <p class="info-pic">
    <b>Downloads</b>
    ${pic.downloads}
  </p>
</div>
</div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', htmlString);
};

form.addEventListener('submit', e => {
  page = 1;
  gallery.innerHTML = '';
  e.preventDefault();
  loadPictures(String(input.value));
});

loadBtn.addEventListener('click', e => {
  page += 1;
  loadPictures(String(input.value));
});
