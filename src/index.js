const API_URL = 'https://animal-api-two.vercel.app';

const $content = document.querySelector('div.content');
let temp = [];

const getData = async () => {
  let res = await fetch(API_URL);

  try {
    if (res) {
      let data = await res.json();
      data.photos.forEach((item) => {
        temp += `<img src=${item.url} alt='animail image'>`;
      });

      $content.innerHTML = temp;
    }
  } catch (error) {
    console.error(error);
  }
};

getData();
