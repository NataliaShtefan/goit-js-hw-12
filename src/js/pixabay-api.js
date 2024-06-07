import axios from "axios";

const API_KEY = "23963114-6d0d5d874ae460d9125bacd21";
const BASE_URL = "https://pixabay.com/api/";


 export async function fetchImages(query, page = 1) {
const response = await axios(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15
    }
})
return response.data;
 }








// export async function fetchImages(query) {
//     // const API_KEY = "23963114-6d0d5d874ae460d9125bacd21";
//     // const BASE_URL = "https://pixabay.com/api/";
    
//     const params = new URLSearchParams( {
//         key: API_KEY,
//         q: query,
//         image_type: "photo",
//         lang: "en",
//         safesearch: "true"
//     })

// const url = `${BASE_URL}?${params}`

//     const response = await fetch (url);
//     if (!response.ok) {
//       throw new Error('Failed to fetch images');
//     }
//     return response.json();
//   }