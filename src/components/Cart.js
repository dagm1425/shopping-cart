/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Cart(props) {
  const { cart, totalPrice, updateQuantity, isCartOpen, closeCart } = props;
  const cartItems = cart.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      title={item.title}
      img={item.img}
      quantity={item.quantity}
      price={item.price}
      updateQuantity={updateQuantity}
    />
  ));

  return (
    <>
      <CartWrapper active={isCartOpen}>
        <CartHeader>
          <HeaderH3>Shopping Cart</HeaderH3>
          <CloseBtn onClick={closeCart}>
            <IconContext.Provider
              value={{
                style: { fontSize: "26px", color: "#000" },
              }}
            >
              <AiOutlineClose />
            </IconContext.Provider>
          </CloseBtn>
        </CartHeader>
        {cart.length ? (
          <LoadedCartWrapper>
            <div>
              <CartItemsWrapper>{cartItems}</CartItemsWrapper>
              <SubTotWrapper>
                <SubTotP>Subtotal:</SubTotP>
                <SubTotSpan>{"$" + totalPrice.toFixed(2)}</SubTotSpan>
              </SubTotWrapper>
            </div>
            <CheckoutBtn>Checkout</CheckoutBtn>
          </LoadedCartWrapper>
        ) : (
          <EmptyCartWrapper>
            <h3>Your cart is empty.</h3>
            <IconContext.Provider
              value={{
                style: {
                  fontSize: "10rem",
                  color: "#000",
                  opacity: "0.1",
                  margin: "0 auto",
                },
              }}
            >
              <AiOutlineShopping />
            </IconContext.Provider>
            <StyledLink to="/shop">
              <MainBtn onClick={closeCart}>Browse items</MainBtn>
            </StyledLink>
          </EmptyCartWrapper>
        )}
      </CartWrapper>

      <Overlay active={isCartOpen} onClick={closeCart} />
    </>
  );
}

const CartWrapper = styled.div`
  background-color: #f7f7f7;
  position: fixed;
  transform: translateX(100%);
  transition: 200ms ease-in-out;
  width: 35%;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 30;
  overflow-y: scroll;

  ${({ active }) =>
    active &&
    `
  transform: translateX(0%);
`}
`;

const Overlay = styled.div`
  position: fixed;
  opacity: 0;
  transition: 200ms ease-in-out;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 10;

  ${({ active }) =>
    active &&
    `
  opacity: 1;
  pointer-events: all;`}
`;

const CartHeader = styled.div`
  height: 8%;
  width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderH3 = styled.h3`
  line-height: 100%;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const LoadedCartWrapper = styled.div`
  height: 92%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const EmptyCartWrapper = styled.div`
  height: 92%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
`;

const StyledLink = styled(Link)`
  width: 100%;
`;

const SubTotWrapper = styled.div`
  text-align: center;
  padding-top: 1rem;
`;

const SubTotP = styled.p`
  display: inline;
  font-weight: 700;
  text-transform: uppercase;
  margin-right: 0.5rem;
`;

const SubTotSpan = styled.span`
  font-size: 1.25rem;
`;

const MainBtn = styled.button`
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

const CheckoutBtn = styled(MainBtn)`
  margin: 6rem 0rem;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3.75rem;
`;
