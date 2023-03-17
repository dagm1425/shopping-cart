/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { AiOutlineShopping } from "react-icons/ai";
import { IconContext } from "react-icons";

const Nav = (props) => {
  const { cart, openCart, setBg, rmBg, bgImg } = props;
  const linkStyle = { textDecoration: "none", color: "inherit" };

  return (
    <Wrapper navBg={!bgImg}>
      <Link style={linkStyle} to="/" onClick={setBg}>
        <BrandName>athletic outfitters</BrandName>
      </Link>
      <Div>
        <Link style={linkStyle} to="/shop" onClick={rmBg}>
          <Li>Shop</Li>
        </Link>
        <Cart onClick={openCart}>
          <IconContext.Provider
            value={{
              style: { fontSize: "35px", color: "#fff" },
            }}
          >
            <AiOutlineShopping />
          </IconContext.Provider>
          {cart.length > 0 && <CartIndex>{cart.length}</CartIndex>}
        </Cart>
      </Div>
    </Wrapper>
  );
};

export default Nav;

const Li = styled.p`
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
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

const Wrapper = styled.nav`
  display: flex;
  min-height: 8vh;
  width: 100%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
  text-decoration: none;

  ${(props) =>
    props.navBg &&
    css`
      background-color: #232f3e;
      color: #fff;
    `}
`;

const BrandName = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  height: 35px;
  line-height: 35px;
`;

const Div = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: space-around;
  list-style-type: none;
`;

const Cart = styled.button`
  width: 35px;
  height: 35px;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  position: relative;
`;

const CartIndex = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.375rem;
  height: 1.375rem;
  font-weight: 800;
  color: #ffd814;
  background-color: #232f3e;
  padding: 1.75px;
  border: 2px solid #fff;
  border-radius: 50%;
`;
