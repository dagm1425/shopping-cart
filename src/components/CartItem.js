/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

export default function CartItem(props) {
  const { id, title, quantity, image, price, updateQuantity } = props;

  return (
    <ItemWrapper>
      <Img src={image} alt="item-img" />
      <div>
        <p style={{ fontWeight: "bold" }}>{title}</p>
        <p>{price}</p>
        <button
          type="button"
          onClick={(e) => updateQuantity(e.target.innerText, id)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          content="+"
          onClick={(e) => updateQuantity(e.target.innerText, id)}
        >
          +
        </button>
      </div>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 110px;
  width: 85%;
  margin: 0 auto;
  border: 3px solid #fff;
`;

const Img = styled.img`
  height: 75px;
  width: 35%;
`;
