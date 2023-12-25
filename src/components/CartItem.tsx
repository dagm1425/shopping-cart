import React from "react";
import styled from "styled-components";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";

interface CartItemProps {
  id: string;
  title: string;
  quantity: number;
  img: string;
  price: number;
  updateQuantity: (op: string, id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  quantity,
  img,
  price,
  updateQuantity,
}) => {
  return (
    <ItemWrapper>
      <ImgWrapper>
        <Img src={img} alt={title} />
      </ImgWrapper>
      <div>
        <TitleP>{title}</TitleP>
        <PriceP>{"$" + price.toFixed(2)}</PriceP>
        <QtyController>
          <QtyBtn onClick={() => updateQuantity("-", id)}>
            <IconContext.Provider
              value={{
                style: { fontSize: "16px", color: "#000" },
              }}
            >
              <AiOutlineMinus />
            </IconContext.Provider>
          </QtyBtn>
          <p>{quantity}</p>
          <QtyBtn onClick={() => updateQuantity("+", id)}>
            <IconContext.Provider
              value={{
                style: { fontSize: "16px", color: "#000" },
              }}
            >
              <AiOutlinePlus />
            </IconContext.Provider>
          </QtyBtn>
        </QtyController>
      </div>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 410px;
  margin: 0 auto;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #b0b0b0;

  @media (max-width: 575px) {
    width: 360px;
  }
`;

const ImgWrapper = styled.div`
  height: 90px;
  width: 90px;
  background-color: #fff;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const TitleP = styled.p`
  font-size: 0.925rem;
  margin-bottom: 0.5rem;
`;

const PriceP = styled.p`
  font-size: 0.925rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const QtyController = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  padding: 3px;
  border: 0.75px solid #a6a6a6;
  border-radius: 5px;
`;

const QtyBtn = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

export default CartItem;
