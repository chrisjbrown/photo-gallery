import data from "./data";

export const getPhotos = ({ page = 1, perPage = 10, query }) => {
  return new Promise(function (resolve) {
    const start = page === 1 ? 0 : (page - 1) * perPage;
    const end = page === 1 ? perPage : page * perPage;
    const photos = query
      ? data.photo.filter((photo) => photo.title.toLowerCase().includes(query))
      : data.photo;

    setTimeout(resolve, 300, {
      photos: photos.slice(start, end),
      pages: Math.ceil(photos.length / perPage),
    });
  });
};

export const patchPhoto = ({ photoPatch }) => {
  return new Promise(function (resolve) {
    const photoIndex = data.photo.findIndex(
      (photo) => photo.id === photoPatch.id
    );

    data.photo[photoIndex] = {
      ...data.photo[photoIndex],
      title: photoPatch.title,
      ispublic: photoPatch.isPublic,
      description: {
        _content: photoPatch.description,
      },
    };

    setTimeout(resolve, 300, data.photo[photoIndex]);
  });
};
