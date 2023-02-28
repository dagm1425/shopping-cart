/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";

export default function Cart(props) {
  const { cart, totalPrice, updateQuantity } = props;
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
    <CartWrapper>
      {cart.length ? (
        <>
          <ItemsWrapper>{cartItems}</ItemsWrapper>
          <h3 style={{ textAlign: "center" }}>Subtotal: {totalPrice}</h3>
        </>
      ) : (
        <h3>Your shopping list is empty.</h3>
      )}
    </CartWrapper>
  );
}

const CartWrapper = styled.div`
  background-color: #eee;
  position: fixed;
  width: 25%;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 1;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
