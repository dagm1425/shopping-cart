/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import styled from "styled-components";
import ItemCard from "../components/ItemCard";

export default function Shop(props) {
  const { loadItems, items, addToCart } = props;

  useEffect(() => {
    loadItems();
  }, []);

  return (
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
  );
}

const ItemsGrid = styled.div`
  display: grid;
  width: 60%;
  padding: 8rem 0;
  margin: 0 auto;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;
