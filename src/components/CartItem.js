/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function CartItem(props) {
  const { id, title, quantity, img, price, updateQuantity } = props;

  return (
    <ItemWrapper>
      <Img src={img} alt="item-img" />
      <div>
        <TitleP>{title}</TitleP>
        <PriceP>{"$" + price.toFixed(2)}</PriceP>
        <QtyController>
          <QtyBtn onClick={() => updateQuantity("-", id)}>
            <IconContext.Provider
              value={{
                style: { fontSize: "18px", color: "#000" },
              }}
            >
              <AiOutlineMinus />
            </IconContext.Provider>
          </QtyBtn>
          <QtyP>{quantity}</QtyP>
          <QtyBtn onClick={() => updateQuantity("+", id)}>
            <IconContext.Provider
              value={{
                style: { fontSize: "18px", color: "#000" },
              }}
            >
              <AiOutlinePlus />
            </IconContext.Provider>
          </QtyBtn>
        </QtyController>
      </div>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #000;
`;

const Img = styled.img`
  height: 110px;
  width: 110px;
  object-fit: contain;
  background-color: #fff;
`;

const TitleP = styled.p`
  margin-bottom: 1rem;
`;

const PriceP = styled.p`
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const QtyController = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border: 0.75px solid #000;
`;

const QtyBtn = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

const QtyP = styled.p`
  // width: 50px;
  // height: 28px;
  // text-align: center;
  // margin-top: 0.75rem;
`;
