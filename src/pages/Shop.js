/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import styled from "styled-components";
import ItemCard from "../components/ItemCard";

export default function Shop(props) {
  const { loadItems, sortItems, items, addToCart } = props;

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      <SorterWrapper>
        <p>Sort</p>
        <StyledSelect
          name="selectedSort"
          defaultValue="sortDefault"
          onChange={(e) => {
            sortItems(e.target.value);
          }}
        >
          <option value="sortDefault">default sorting</option>
          <option value="sortPriceLtoH">lowest price</option>
          <option value="sortPriceHtoL">highest price</option>
        </StyledSelect>
      </SorterWrapper>
      <ItemsGrid>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            title={item.title}
            rating={item.rating}
            price={item.price}
            img={item.img}
            addToCart={addToCart}
          />
        ))}
      </ItemsGrid>
    </>
  );
}

const SorterWrapper = styled.div`
  display: flex;
  width: 60%;
  margin: 5rem auto 0;
  background-color: #f7f7f7;
  font-size: 14px;
  padding: 0.75rem 0;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
`;

const StyledSelect = styled.select`
  font: inherit;
  text-transform: capitalize;
  padding: 0.5rem 0.75rem;
  margin-right: 2rem;
  background-color: #fff;
  border-radius: 6px;
`;

const ItemsGrid = styled.div`
  display: grid;
  width: 60%;
  padding: 4rem 0 8rem;
  margin: 0 auto;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;
