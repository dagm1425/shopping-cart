/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import ReactImageMagnify from "react-image-magnify";

function ItemDetail({ items, addToCart }) {
  const { id } = useParams();
  const item = items.find((item) => item.id === id);
  const [img, setImg] = useState(item.gallery[0]);
  const [active, setActive] = useState(item.gallery[0]);

  const hoverHandler = (img) => {
    setImg(img);
    setActive(img);
    // refs.current[i].classList.add("active");
    // for (let j = 0; j < item.gallery.length; j++) {
    //   if (i !== j) {
    //     refs.current[j].classList.remove("active");
    //   }
    // }
  };

  // const refs = useRef([]);
  // refs.current = [];

  // const addRefs = (el) => {
  //   if (el && !refs.current.includes(el)) {
  //     refs.current.push(el);
  //   }
  // };

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
          />
        </LeftDiv2>
      </LeftDiv>
      <RightDiv>
        <div>
          <p>Brand: {item.brand}</p>
          <h2>{item.title}</h2>
        </div>
        <p>{item.rating}</p>
        <h3>{item.price}</h3>
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
  margin: 2.5rem auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const LeftDiv = styled.div`
  display: flex;
  height: 50vh;
  gap: 1rem;
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
  object-fit: contain;
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

const AddToCartBtn = styled.button`
  width: 40%;
  padding: 1.25rem 2rem;
  letter-spacing: 0.05rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
`;
