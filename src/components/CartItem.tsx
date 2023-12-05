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
        <Img src={img} alt="item-img" />
      </ImgWrapper>
      <DetailWrapper>
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
          <p>{quantity}</p>
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
      </DetailWrapper>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #b0b0b0;
`;

const ImgWrapper = styled.div`
  height: 110px;
  width: 110px;
  background-color: #fff;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const DetailWrapper = styled.div`
  width: 420px;
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

export default CartItem;
