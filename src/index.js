const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const key = '33287723-ac3e9d0bf292ee3d9e11c0a66';
let serachPhrase;
let page = 1;
const loadPictures = async q => {
  try {
    let response = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    let resp = await response.json();
    console.log(resp);
    let picturesArray = resp.hits;
    console.log(picturesArray);
    displayPictures(picturesArray);
  } catch {
    error => console.log(error);
  }
};

const displayPictures = pictures => {
  if (pictures.length === 0) return console.log('found nothing');
  const htmlString = pictures
    .map(pic => {
      return `<a href='${pic.largeImageURL}'><div class="photo-card">
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
  gallery.innerHTML = htmlString;
};

form.addEventListener('submit', e => {
  e.preventDefault();
  loadPictures(String(input.value));
});
