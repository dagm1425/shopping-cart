import React, { CSSProperties } from "react";
import styled from "styled-components";

type OnClick =
  | (() => void)
  | ((event: React.MouseEvent<HTMLButtonElement>) => Promise<void>);

interface MainBtnProps {
  onClick: OnClick;
  children: React.ReactNode;
  style?: CSSProperties;
}

const MainBtn: React.FC<MainBtnProps> = ({ style = {}, onClick, children }) => {
  return (
    <Button style={style} onClick={onClick}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  position: relative;
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  font-weight: 700;
  text-transform: uppercase;
  width: 75%;
  background-color: transparent;
  padding: 2rem 0;
  border: 1px solid #000;
  outline: none;
  cursor: pointer;
  z-index: 1;
  transition: 200ms ease-in-out;

  & a {
    color: inherit;
    text-decoration: none;
  }

  &:hover,
  &:focus {
    color: #fff;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background-color: #000;
    transition: 250ms ease-in-out;
    transform: scaleX(0);
    transform-origin: left;
  }

  &:hover::before,
  &:focus::before {
    transform: scaleX(1);
  }
`;

export default MainBtn;
