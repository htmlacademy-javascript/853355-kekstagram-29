const GET_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://29.javascript.pages.academy/keksta1gram';

const getData = (cb) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((data) => {
      cb(data);
    });
};

const postData = (onSuccess, onFail, onFormSubmit, form) => {
  const formData = new FormData(form);
  fetch(
    POST_URL,
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
