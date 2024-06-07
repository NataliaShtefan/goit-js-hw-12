
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



let lightbox = new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionDelay: 250,
  });;
  
   export function createGallery (images, isNewQuery) {
    const gallery = document.querySelector('.gallery');
    if (isNewQuery) {
      gallery.innerHTML = '';
    }
    gallery.innerHTML += images.map(({
    largeImageURL, 
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads
  }) => 
    `<li class="gallery-item">
  <a href="${largeImageURL}" >
    <img src="${webformatURL}" alt="${tags}" loading="lazy">
    </a>
    <div class="info">
      <p><b>Likes</b> ${likes}</p>
      <p><b>Views</b> ${views}</p>
      <p><b>Comments</b> ${comments}</p>
      <p><b>Downloads</b> ${downloads}</p>
    </div>
  
  </li>`).join('');
    
  lightbox.refresh();

  // const newHeight = gallery.clientHeight;
  // window.scrollBy({
  //   top: newHeight - prevHeight,
  //   behavior: 'smooth'
  // });
  }

  export function showError(message) {
    iziToast.error({
      title: 'Error',
      message: message,
      position: 'topRight'
    });
  }



  export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
  }
  
  export function showLoader() {
    document.querySelector('.div-loader').classList.remove('hidden');
  }
  
  export function hideLoader() {
    document.querySelector('.div-loader').classList.add('hidden');
  }


  export function toggleLoadMoreButton(show) {
    const loadMoreButton = document.querySelector('.btn-more');
    if (show) {
      loadMoreButton.classList.remove('hidden');
    } else {
  loadMoreButton.classList.add('hidden')
    }
  }