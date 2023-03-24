/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-rating-stars-component";

function ItemDetail({ items, addToCart }) {
  const { id } = useParams();
  const item = items.find((item) => item.id === id);
  const [img, setImg] = useState(item.gallery[0]);
  const [active, setActive] = useState(item.gallery[0]);

  const hoverHandler = (img) => {
    setImg(img);
    setActive(img);
  };

  return (
    <Wrapper>
      <LeftDiv>
        <LeftDiv1>
          {item.gallery.map((img, i) => (
            <ImgWrapper
              key={i}
              // className={i == 0 ? "img_wrap active" : "img_wrap"}
              active={img === active}
              onMouseOver={() => hoverHandler(img, i)}
              // ref={addRefs}
            >
              <SliderImg src={img} alt="" />
            </ImgWrapper>
          ))}
        </LeftDiv1>
        <LeftDiv2>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "",
                src: img,
                width: 380,
                height: 460,
              },
              largeImage: {
                src: img,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: "125%",
                height: "100%",
              },
            }}
            style={{ zIndex: "10" }}
          />
          <p>Roll over image to zoom in</p>
        </LeftDiv2>
      </LeftDiv>
      <RightDiv>
        <div>
          <p>Brand: {item.brand}</p>
          <TitleH2>{item.title}</TitleH2>
          <StarsWrapper>
            <ReactStars
              value={item.rating}
              count={5}
              size={24}
              isHalf={true}
              edit={false}
              activeColor="#faaf00"
              style={{ zIndex: "-1" }}
            />
            <span>{item.rating}</span>
          </StarsWrapper>
        </div>
        <h2>{"$" + item.price.toFixed(2)}</h2>
        <AddToCartBtn onClick={() => addToCart(item.id)}>
          add to cart
        </AddToCartBtn>
      </RightDiv>
    </Wrapper>
  );
}

export default ItemDetail;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const LeftDiv = styled.div`
  display: flex;
  height: 50vh;
  gap: 1.75rem;
`;

const LeftDiv1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LeftDiv2 = styled.div`
  & img {
    object-fit: contain;
  }
  & p {
    color: #565959;
    margin-top: 1.75rem;
    font-size: 0.875rem;
    text-align: center;
  }
`;

const ImgWrapper = styled.div`
  width: 80px;
  height: 80px;
  border: 1px, solid #eee;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      border: 2px solid #e77600;
    `}
`;

const SliderImg = styled.img`
  width: 70px;
  height: 70px;
  margin: 4px;
  object-fit: contain;
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.75rem;
`;

const TitleH2 = styled.h2`
  margin-bottom: 0.75rem;
`;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
`;

const AddToCartBtn = styled.button`
  width: 40%;
  background-color: #ffd814;
  border: none;
  border-radius: 25px;
  border-color: #fcd200;
  padding: 1.25rem 2rem;
  letter-spacing: 0.05rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: 120ms ease-in;

  &:hover {
    filter: brightness(0.9);
  }
`;
