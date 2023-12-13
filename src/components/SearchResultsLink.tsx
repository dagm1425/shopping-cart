import React from "react";
import { Item } from "src/typings/sharedTypes";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface SearchResultsLinkProps {
  result: Item;
  toggleSearchBar: () => void;
}

const SearchResultsLink: React.FC<SearchResultsLinkProps> = ({
  result,
  toggleSearchBar,
}) => {
  return (
    <StyledLink to={`/shop/${result.id}`} onClick={toggleSearchBar}>
      <ImgWrapper>
        <Img src={result.img} alt={result.title} />
      </ImgWrapper>
      <TitleP>{result.title}</TitleP>
      <PriceP>{"$" + result.price.toFixed(2)}</PriceP>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  background-color: #fff;
  margin-bottom: 0.5rem;
  border-radius: 4px;

  &:hover {
    filter: brightness(0.8);
  }
`;

const ImgWrapper = styled.div`
  height: 55px;
  width: 55px;
  background-color: #fff;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  padding: 0.5rem;
`;

const TitleP = styled.p`
  font-size: 14px;
`;

const PriceP = styled.p`
  font-size: 14px;
  font-weight: 700;
  padding-right: 0.5rem;
  margin-left: auto;
`;

export default SearchResultsLink;
