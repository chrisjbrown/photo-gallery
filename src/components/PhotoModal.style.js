import styled from "styled-components";

export const StyledBody = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const StyledTitle = styled.h2`
  text-align: center;
  margin: 0;
`;

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 20px;
  align-items: center;

  label {
    grid-column: 1 / 2;
    align-self: flex-start;
    line-height: 34px;
  }

  input,
  textarea {
    grid-column: 2 / 3;
  }

  textarea {
    resize: none;
  }

  input[type="checkbox"] {
    justify-self: left;
  }
`;
