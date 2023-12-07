import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { AiOutlineShopping } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Item } from "src/typings/sharedTypes";

interface NavProps {
  cart: Item[];
  toggleCart: () => void;
  location: string;
}

const Nav: React.FC<NavProps> = ({ cart, toggleCart, location }) => {
  return (
    <Wrapper $navbg={location !== ""}>
      <StyledLink $fullwidth={true} to="/">
        <BrandName>athletic outfitters</BrandName>
      </StyledLink>
      <Div>
        <StyledLink to="/shop">
          <Li>Shop</Li>
        </StyledLink>
        <Cart onClick={toggleCart}>
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

const StyledLink = styled(Link)<{ $fullwidth?: boolean }>`
  text-decoration: none;
  color: inherit;

  ${(props) =>
    props.$fullwidth &&
    css`
      width: 100%;
    `}
`;

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

const Wrapper = styled.nav<{ $navbg?: boolean }>`
  color: #fff;
  display: flex;
  min-height: 8vh;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  text-decoration: none;

  ${(props) =>
    props.$navbg &&
    css`
      background-color: #232f3e;
    `}
`;

const BrandName = styled.p`
  width: 30%;
  text-align: center;
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
  padding: 2px;
  border: 2px solid #fff;
  border-radius: 50%;
`;

export default Nav;
