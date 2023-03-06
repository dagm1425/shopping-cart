/* eslint-disable react/prop-types */
import styled from "styled-components";

export default function ItemCard(props) {
  const { id, title, price, img, addToCart } = props;

  return (
    <Card>
      <Img src={img} alt="item-img"></Img>
      <h3>{title}</h3>
      <p>{price}</p>
      <button
        onClick={() => {
          addToCart(id);
        }}
      >
        Add to cart
      </button>
    </Card>
  );
}

const Card = styled.div`
  text-align: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: 300ms;
  cursor: pointer;
  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
`;

const Img = styled.img`
  width: 230px;
  height: 260px;
  object-fit: cover;
`;
