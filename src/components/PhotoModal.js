import React, { useState } from "react";

import Modal from "./Modal";
import Divider from "./Divider";
import Button from "./Button";

import { StyledBody, StyledTitle, StyledForm } from "./PhotoModal.style";

function PhotoModal({ photo = {}, confirm = () => {}, cancel = () => {} }) {
  const [title, setTitle] = useState(photo.title);
  const [description, setDescription] = useState(photo.description);
  const [isPublic, setIsPublic] = useState(photo.isPublic);

  const footer = (
    <React.Fragment>
      <Button onClick={cancel}>Cancel</Button>
      <Button onClick={save}>Save</Button>
    </React.Fragment>
  );

  function updateTitle(e) {
    setTitle(e.target.value);
  }

  function updateDescription(e) {
    setDescription(e.target.value);
  }

  function updateIsPublic(e) {
    setIsPublic(e.target.checked ? 1 : 0);
  }

  function save() {
    confirm({
      id: photo.id,
      title,
      description,
      isPublic,
    });
  }

  return (
    <Modal confirm={save} cancel={cancel} footer={footer}>
      <StyledBody>
        <StyledTitle>{title}</StyledTitle>
        <Divider />
        <StyledForm>
          <label htmlFor="name">Title: </label>
          <input type="text" id="title" value={title} onChange={updateTitle} />

          <label htmlFor="description">Description: </label>
          <textarea
            rows="5"
            type="text"
            id="description"
            value={description}
            onChange={updateDescription}
          />

          <label htmlFor="publicDomain">Public domain: </label>
          <input
            id="publicDomain"
            type="checkbox"
            checked={isPublic === 1}
            value={isPublic}
            onChange={updateIsPublic}
          />

          <label htmlFor="id">ID: </label>
          <span id="id">{photo.id}</span>

          <label htmlFor="owner">Owner name: </label>
          <span id="owner">{photo.ownerName}</span>

          <label htmlFor="dimensions">Dimensions: </label>
          <span id="dimensions">
            {photo.dimensions.width} x {photo.dimensions.height}
          </span>
        </StyledForm>
        <Divider />
      </StyledBody>
    </Modal>
  );
}

export default PhotoModal;
