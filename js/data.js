import { displayPosts } from './posts.js';

const getData = () => {
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      displayPosts(data);
    });
};

const postData = (onSuccess, onFail, onFormSubmit, form) => {
  const formData = new FormData(form);
  fetch(
    'https://29.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess(onFormSubmit);
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, postData};
