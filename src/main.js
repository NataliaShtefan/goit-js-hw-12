import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api';
import { createGallery, showError, clearGallery, showLoader, hideLoader, toggleLoadMoreButton, } from './js/render-functions';

const gallery = document.querySelector(".gallery")

let currentPage = 1;
let currentQuery = "";

document.querySelector('.search-form').addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = event.target.elements.images.value.trim();
    console.log(query)
    if (!query) {
      showError('Please enter a search query');
      return;
    }
    currentQuery = query;
    currentPage = 1;
    clearGallery();
    toggleLoadMoreButton(false);
    showLoader();
    try {
      const data = await fetchImages(query);
      if (data.hits.length === 0) {
        showError('Sorry, there are no images matching your search query. Please try again!');
      } else {
        createGallery(data.hits, true);
        toggleLoadMoreButton(data.totalHits > currentPage * 15);
      }
    } catch (error) {
      showError(error.message);
    } finally {
      hideLoader();
    }
  });


document.querySelector('.btn-more').addEventListener('click', async () => {
    currentPage += 1;
    showLoader();
    try {
      const data = await fetchImages(currentQuery, currentPage);
      if (data.totalHits <= currentPage * 15) {
        iziToast.info({
          title: 'info',
          message: 'Weare sorry, but you`ve reached the end of search result.',
          position: 'topRight'
        });
      }
      createGallery(data.hits);
      const galleryItems = document.querySelectorAll(".gallery-item");
      if (galleryItems.length > 0) {
          const itemHeight = galleryItems[0].getBoundingClientRect().height;

          // Прокрутити сторінку на дві висоти картки галереї
          window.scrollBy({
              top: itemHeight * 2,
              behavior: 'smooth'
          })}
    } catch (error) {
      showError(error.message);
    } finally {
      hideLoader();
    }
  });