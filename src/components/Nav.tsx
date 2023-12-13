import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineShopping } from "react-icons/ai";
import { IconContext } from "react-icons";
import { IoSearchSharp } from "react-icons/io5";
import { Item } from "src/typings/sharedTypes";

interface NavProps {
  cart: Item[];
  toggleSearchBar: () => void;
  toggleCart: () => void;
  location: string;
}

const Nav: React.FC<NavProps> = ({
  cart,
  toggleSearchBar,
  toggleCart,
  location,
}) => {
  return (
    <Wrapper $navbg={location !== ""}>
      <StyledLink to="/">
        <BrandName>athletic outfitters</BrandName>
      </StyledLink>
      <Div>
        <SearchLink onClick={toggleSearchBar}>
          <IoSearchSharp style={{ fontSize: "1.25rem" }} />
          <p style={{ verticalAlign: "center" }}>Search</p>
        </SearchLink>
        <StyledLink to="/shop">Shop</StyledLink>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    opacity: 0.8;
  }
`;

const SearchLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.325rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Wrapper = styled.nav<{ $navbg?: boolean }>`
  width: 100%;
  min-height: 9vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  background-color: ${({ $navbg }) => ($navbg ? "#232f3e" : "transparent")};
  text-decoration: none;
`;

const BrandName = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  height: 35px;
  line-height: 35px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 4rem;
  list-style-type: none;

  @media (max-width: 575px) {
    gap: 1.5rem;
  }
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

const CartIndex = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  font-weight: 800;
  color: #ffd814;
  background: #232f3e;
  border: 2px solid #fff;
  border-radius: 50%;
  text-align: center;
`;

export default Nav;
