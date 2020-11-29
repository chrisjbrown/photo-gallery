import React, { useReducer, useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";

import Divider from "../components/Divider";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import PhotoModal from "../components/PhotoModal";
import { getPhotos, patchPhoto } from "../MockAPI/photos.js";

import {
  Header,
  StyledLink,
  Controls,
  List,
  StyledImage,
} from "./Gallery.style";

const initialState = {
  pages: 1,
  photos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PHOTOS":
      return {
        ...state,
        photos: action.payload.photos,
        pages: action.payload.pages,
      };
    case "UPDATE_PHOTO": {
      const photos = state.photos.map((photo) => {
        if (photo.id === action.payload.photo.id) {
          return {
            ...photo,
            ...action.payload.photo,
          };
        }
        return photo;
      });
      return {
        ...state,
        photos,
      };
    }
    default:
      return state;
  }
};

function selectPhoto(state, id) {
  const photo = state.find((photo) => photo.id === id);

  if (photo) {
    return {
      id: photo.id,
      title: photo.title,
      description: photo.description._content,
      isPublic: photo.ispublic,
      ownerName: photo.ownername,
      dimensions: {
        width: photo.width_s,
        height: photo.height_s,
      },
    };
  }

  return null;
}

function Gallery() {
  const history = useHistory();
  const { photoId } = useParams();
  const searchParams = new URLSearchParams(useLocation().search);
  const page = Number.parseInt(searchParams.get("page")) || 1;
  const perPage = Number.parseInt(searchParams.get("perPage")) || 10;
  const query = searchParams.get("query") || "";

  const [selectedPhoto, setSelectedPhoto] = useState();
  const [isPendingPhotos, setPendingPhotos] = useState(true);
  const [{ pages, photos }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setSelectedPhoto(photoId ? selectPhoto(photos, photoId) : null);
  }, [photos, photoId]);

  useEffect(() => {
    setPendingPhotos(true);

    getPhotos({ page, perPage, query }).then((response) => {
      setPendingPhotos(false);
      dispatch({ type: "SET_PHOTOS", payload: response });
    });
  }, [page, perPage, query]);

  function updateSearch(e) {
    if (e.target.value) {
      searchParams.set("query", e.target.value);
    } else {
      searchParams.delete("query");
    }

    searchParams.set("page", 1);
    pushToHistory();
  }

  function updatePerPage(e) {
    searchParams.set("perPage", e.target.value);
    pushToHistory();
  }

  function updatePage(newPage) {
    if (newPage === 0 || newPage > pages) {
      return;
    }
    searchParams.set("page", newPage);
    pushToHistory();
  }

  function updatePhoto(photo) {
    patchPhoto({ photoPatch: photo }).then((response) => {
      dispatch({ type: "UPDATE_PHOTO", payload: { photo: response } });
    });
    closeModal();
  }

  function closeModal() {
    pushToHistory();
  }

  function pushToHistory() {
    history.push({ pathname: "/", search: `?${searchParams.toString()}` });
  }

  function renderPhotoModal() {
    if (selectedPhoto) {
      return (
        <PhotoModal
          photo={selectedPhoto}
          confirm={updatePhoto}
          cancel={closeModal}
        />
      );
    } else {
      const footer = (
        <React.Fragment>
          <Button onClick={closeModal}>Close</Button>
        </React.Fragment>
      );

      return (
        <Modal cancel={closeModal} footer={footer}>
          Oh no that photo wasn't found!
        </Modal>
      );
    }
  }

  const PhotoList = React.memo((props) => (
    <List pending={props.isPending}>
      {props.photos.map((photo) => (
        <StyledLink
          key={photo.id}
          to={{
            pathname: `/${photo.id}`,
            search: `?${searchParams.toString()}`,
          }}
        >
          <StyledImage
            title={photo.title}
            alt={photo.title}
            src={photo.url_s}
          />
        </StyledLink>
      ))}
    </List>
  ));

  return (
    <div>
      {photoId && renderPhotoModal()}
      <Header>Photo Gallery</Header>
      <Controls>
        <input name="search" placeholder="search" onChange={updateSearch} />
        <select value={perPage} onChange={updatePerPage}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <div>
          Displaying page {page} of {pages}
        </div>
      </Controls>
      <Divider />
      <PhotoList isPending={isPendingPhotos} photos={photos} />
      <Divider />
      <Pagination page={page} pages={pages} updatePage={updatePage} />
    </div>
  );
}

export default Gallery;
