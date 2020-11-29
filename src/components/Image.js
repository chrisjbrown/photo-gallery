import styled from "styled-components";
import fallbackImg from "../assets/not-found.png";

export const StyledImage = styled.div`
  text-align: center;
  color: black;
`;

function Image({
  onClick = () => {},
  className = "",
  alt = "",
  src = "",
  title = "",
  children,
}) {
  function handleError(e) {
    e.target.src = fallbackImg;
  }

  return (
    <StyledImage>
      <img
        onClick={onClick}
        className={className}
        onError={handleError}
        alt={alt}
        src={src}
        title={title}
      >
        {children}
      </img>
      {title}
    </StyledImage>
  );
}

export default Image;
