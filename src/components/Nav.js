/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = (props) => {
  const { cart, openCart, setBg, rmBg } = props;
  const linkStyle = { textDecoration: "none", color: "inherit" };

  return (
    <nav>
      <Link style={linkStyle} to="/" onClick={setBg}>
        <h2>FakeStore</h2>
      </Link>
      <ul>
        <Link style={linkStyle} to="/shop" onClick={rmBg}>
          <Li>Shop</Li>
        </Link>
        <li onClick={openCart}>{cart.length}</li>
      </ul>
    </nav>
  );
};

export default Nav;

const Li = styled.li`
  position: relative;
  padding-bottom: 4px;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: #fff;
    transform: scaleX(0);
    transition: 200ms ease-in-out;
  }

  &:hover:before,
  &:hover:before {
    transform: scaleX(1);
  }
`;
