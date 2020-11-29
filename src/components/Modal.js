import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Button from "./Button";

const StyledModal = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);

  > div {
    display: flex;
    flex-direction: column;
    width: 700px;
    min-height: 300px;
    margin: 50px auto;
    background-color: white;
    border-radius: 4px;
    border: 1px solid grey;
    padding: 20px;

    .header {
      display: flex;
      justify-content: center;
    }

    .content {
      display: flex;
      flex-grow: 1;
    }

    .footer {
      display: flex;
      justify-content: flex-end;

      > button:last-child {
        margin-left: 10px;
      }
    }
  }
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function Modal({
  parent = document.body,
  cancel = () => {},
  footer,
  children,
}) {
  return ReactDOM.createPortal(
    <StyledModal>
      <div>
        <CloseButton>
          <Button onClick={cancel}>X</Button>
        </CloseButton>
        <div className="content">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    </StyledModal>,
    parent
  );
}

export default Modal;
