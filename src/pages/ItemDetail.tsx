import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReactImageMagnify, {
  ReactImageMagnifyProps,
  SmallImageType,
} from "react-image-magnify";
import ReactStars from "react-rating-stars-component";
import { Item } from "../typings/sharedTypes";

interface CustomImageMagnifyProps extends ReactImageMagnifyProps {
  smallImage: SmallImageType & {
    isFluidWidth: boolean;
  };
}

interface ImageMagnifyProps {
  img: string;
}

interface ItemDetailProps {
  items: Item[];
  addToCart: (id: string) => void;
}

const MyImageMagnifyComponent: React.FC<ImageMagnifyProps> = ({ img }) => {
  const magnifyProps: CustomImageMagnifyProps = {
    style: { zIndex: 1 },
    smallImage: {
      alt: "",
      src: img,
      width: 330,
      height: 400,
      isFluidWidth: false,
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
  };

  return <ReactImageMagnify {...magnifyProps} />;
};

const ItemDetail: React.FC<ItemDetailProps> = ({ items, addToCart }) => {
  const { id } = useParams();
  const item = items.find((item) => item.id === id);
  const [img, setImg] = useState(item?.gallery[0] || "");
  const [active, setActive] = useState(item?.gallery[0] || "");

  const hoverHandler = (img: string) => {
    setImg(img);
    setActive(img);
  };

  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    item && (
      <Wrapper>
        <LeftDiv>
          <LeftDiv1>
            {item.gallery.map((img, i) => (
              <ImgWrapper
                key={i}
                $active={img === active}
                onMouseOver={() => hoverHandler(img)}
              >
                <SliderImg src={img} alt="" />
              </ImgWrapper>
            ))}
          </LeftDiv1>
          <LeftDiv2>
            <MyImageMagnifyComponent img={img} />
            <ZoomText>Roll over image to zoom in</ZoomText>
          </LeftDiv2>
        </LeftDiv>
        <RightDiv>
          <div>
            <p>
              {item.brand.includes("_")
                ? item.brand.replace("_", " ")
                : item.brand}
            </p>
            <TitleH2>{item.title}</TitleH2>
            <ItemDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore. Ut enim ad minim.
            </ItemDescription>
            <StarsWrapper>
              <ReactStars
                value={item.rating}
                count={5}
                size={18}
                isHalf={true}
                edit={false}
                activeColor="#000"
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
    )
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 575px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 0;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  height: 50vh;
  gap: 1.75rem;

  @media (max-width: 575px) {
    gap: 0rem;
    height: auto;
  }
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

const ImgWrapper = styled.div<{ $active?: boolean }>`
  width: 80px;
  height: 80px;
  border: ${(props) =>
    props.$active ? "2px solid #e77600" : "1px, solid #eee"};
  cursor: pointer;
`;

const SliderImg = styled.img`
  width: 70px;
  height: 70px;
  margin: 4px;
  object-fit: contain;
`;

const ZoomText = styled.p`
  display: block;

  @media (max-width: 575px) {
    display: none;
  }
`;

const RightDiv = styled.div`
  width: 38%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.75rem;

  @media (max-width: 575px) {
    width: 100%;
    padding: 0 1rem 1rem;
  }
`;

const TitleH2 = styled.h2`
  margin-bottom: 0.75rem;
`;

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const AddToCartBtn = styled.button`
  width: 70%;
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

  @media (max-width: 575px) {
    width: 100%;
  }
`;

export default ItemDetail;
