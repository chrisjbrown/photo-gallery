import styled from "styled-components";
import React from "react";
import Button from "../components/Button";

export const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

function Gallery({ page = 1, pages = 1, updatePage = () => {} }) {
  return (
    <StyledFooter>
      <Button
        onClick={() => updatePage(1)}
        title="first page"
        disabled={page === 1}
      >
        {"<<"}
      </Button>
      <Button
        onClick={() => updatePage(page - 1)}
        title="previous page"
        disabled={page === 1}
      >
        {"<"}
      </Button>
      <Button
        onClick={() => updatePage(page + 1)}
        title="next page"
        disabled={page === pages}
      >
        {">"}
      </Button>
      <Button
        onClick={() => updatePage(pages)}
        title="last page"
        disabled={page === pages}
      >
        {">>"}
      </Button>
    </StyledFooter>
  );
}

export default Gallery;
