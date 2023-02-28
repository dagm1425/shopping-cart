/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

export default function Cart(props) {
  const { cart, totalPrice, updateQuantity, isCartOpen, closeCart } = props;
  const cartItems = cart.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      title={item.title}
      image={item.image}
      quantity={item.quantity}
      price={item.price}
      updateQuantity={updateQuantity}
    />
  ));

  return (
    <>
      <CartWrapper active={isCartOpen}>
        <button type="button" onClick={closeCart}>
          Close cart
        </button>
        {cart.length ? (
          <>
            <ItemsWrapper>{cartItems}</ItemsWrapper>
            <h3 style={{ textAlign: "center" }}>Subtotal: {totalPrice}</h3>
          </>
        ) : (
          <>
            <h3>Your cart is empty.</h3>
            <button type="button" onClick={closeCart}>
              <Link to="/shop">Browse items</Link>
            </button>
          </>
        )}
      </CartWrapper>
      <Overlay active={isCartOpen} onClick={closeCart} />
    </>
  );
}

const CartWrapper = styled.div`
  background-color: #eee;
  position: fixed;
  transform: translateX(100%);
  transition: 200ms ease-in-out;
  width: 25%;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 10;

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

  ${({ active }) =>
    active &&
    `
  opacity: 1;
  pointer-events: all;`}
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
