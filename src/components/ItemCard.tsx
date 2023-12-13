import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

interface ItemCardProps {
  id: string;
  title: string;
  price: number;
  rating: number;
  img: string;
  addToCart: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  price,
  rating,
  img,
  addToCart,
}) => {
  return (
    <Card>
      <StyledLink to={`/shop/${id}`}>
        <Img src={img} alt={title} loading="lazy" />
        <TitleP>{title}</TitleP>
        <StarsWrapper>
          <ReactStars
            value={rating}
            count={5}
            size={16}
            isHalf={true}
            edit={false}
            activeColor="#000"
            style={{ zIndex: "-1" }}
          />
          <span>{rating}</span>
        </StarsWrapper>
        <PriceP>{"$" + price.toFixed(2)}</PriceP>
      </StyledLink>
      <AddToCartBtn
        onClick={() => {
          addToCart(id);
        }}
      >
        Add to cart
      </AddToCartBtn>
    </Card>
  );
};

const StyledLink = styled(Link)`
  display: block;
  padding: 1.25rem 0.75rem;
  height: 91%;
  text-decoration: none;
  color: inherit;
`;

const TitleP = styled.p`
  font-size: 14px;
  margin-top: 0.5rem;
`;

const PriceP = styled.p`
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 1rem;
`;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
  font-size: 14px;
`;

const Card = styled.div`
  height: 60vh;
  outline: none;
  border: 2px solid #fff;
  border-bottom: none;
  border-radius: 6px;
  transition: border-color 100ms ease-in;

  &:hover {
    border-color: #eee;
  }

  &:hover button {
    opacity: 1;
    visibility: visible;
  }
`;

const Img = styled.img`
  width: 220px;
  height: 260px;
  object-fit: contain;
`;

const AddToCartBtn = styled.button`
  visibility: hidden;
  width: 100%;
  height: 9%;
  opacity: 0;
  outline: none;
  border: none;
  padding: 0 1.125rem;
  background-color: #ffd814;
  border: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-color: #fcd200;
  letter-spacing: 0.05rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: 100ms ease-in;

  &:hover {
    filter: brightness(0.9);
  }
`;

export default ItemCard;
