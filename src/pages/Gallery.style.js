import styled from "styled-components";
import Image from "../components/Image";
import { Link } from "react-router-dom";

export const Header = styled.h1`
  text-align: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Controls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  align-items: center;
  justify-content: space-between;

  div:last-child {
    justify-self: text-align: right;
  }
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 240px);
  justify-content: center;
  column-gap: 20px;
  row-gap: 20px;
  min-height: 500px;

  opacity: ${(props) => (props.pending ? 0.5 : 1)};
`;

export const StyledImage = styled(Image)`
  width: 240px;
  height: 240px;
`;
