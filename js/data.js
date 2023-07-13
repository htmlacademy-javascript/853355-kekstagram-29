const GET_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://29.javascript.pages.academy/kekstagram';

const getData = (cb, onConnectionFail) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      cb(data);
    })
    .catch((error) => {
      onConnectionFail(error);
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
