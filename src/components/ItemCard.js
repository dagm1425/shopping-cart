/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function ItemCard(props) {
  const { id, title, price, rating, img, addToCart } = props;

  return (
    <Card>
      <StyledLink to={`/shop/${id}`}>
        <Img src={img} alt="item-img" />
        <TitleP>{title}</TitleP>
        <StarsWrapper>
          <ReactStars
            value={rating}
            count={5}
            size={20}
            isHalf={true}
            edit={false}
            activeColor="#faaf00"
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
}

const StyledLink = styled(Link)`
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
  margin-top: 1.25rem;
`;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
  font-size: 14px;
`;

const Card = styled.div`
  padding: 1.25rem 0.75rem;
  outline: none;
  border: 2px solid #fff;
  border-radius: 6px;
  transition: all 120ms ease-in;

  &:hover {
    border-color: #eee;
  }
  &:hover button {
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
  outline: none;
  border: none;
  width: 100%;
  margin-top: 1.25rem;
  padding: 0.75rem 1.125rem;
  background-color: #ffd814;
  border: none;
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
