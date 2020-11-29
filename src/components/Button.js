import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 10px 20px;
  outline: 0;
  cursor: pointer;
  border: 1px solid lightblue;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:active {
    background-color: lightblue;
  }
`;

function Button({
  onClick = () => {},
  className = "",
  title = "",
  disabled = false,
  children,
}) {
  return (
    <StyledButton
      disabled={disabled}
      className={className}
      title={title}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
