import React, { useEffect } from "react";
import styled from "styled-components";
import ItemCard from "../components/ItemCard";
import { Item } from "../typings/sharedTypes";
import { Filters } from "../typings/sharedTypes";

interface ShopProps {
  loadItems: () => void;
  sortItems: (
    sorting: "sortDefault" | "sortPriceLtoH" | "sortPriceHtoL"
  ) => void;
  items: Item[];
  addToCart: (id: string) => void;
  filters: Filters;
  updateFilters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  selectValue: string;
}

const Shop: React.FC<ShopProps> = ({
  loadItems,
  sortItems,
  items,
  addToCart,
  filters,
  updateFilters,
  resetFilters,
  selectValue,
}) => {
  useEffect(() => {
    loadItems();
    resetFilters();
  }, []);

  return (
    <>
      <SorterWrapper>
        <p>Sort</p>
        <StyledSelect
          value={selectValue}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            sortItems(
              e.target.value as
                | "sortDefault"
                | "sortPriceLtoH"
                | "sortPriceHtoL"
            );
          }}
        >
          <option value="sortDefault">default sorting</option>
          <option value="sortPriceLtoH">lowest price</option>
          <option value="sortPriceHtoL">highest price</option>
        </StyledSelect>
      </SorterWrapper>
      <ItemsFiltersWrapper>
        <FilterWrapper>
          <FilterGroup>
            <p>Sportswear for</p>
            <div>
              <input
                type="checkbox"
                id="gender1"
                name="gender"
                value="man"
                checked={filters.gender.man}
                onChange={(e) => updateFilters(e)}
              />
              <label htmlFor="gender1"> Men</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="gender2"
                name="gender"
                value="woman"
                checked={filters.gender.woman}
                onChange={(e) => updateFilters(e)}
              />
              <label htmlFor="gender2"> Women</label>
            </div>
          </FilterGroup>

          <FilterGroup>
            <p>Brand</p>
            <div>
              <input
                type="checkbox"
                id="brand1"
                name="brand"
                value="Hanes"
                checked={filters.brand.Hanes}
                onChange={(e) => updateFilters(e)}
              />
              <label htmlFor="brand1"> Hanes</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="brand2"
                name="brand"
                value="Champion"
                checked={filters.brand.Champion}
                onChange={(e) => updateFilters(e)}
              />
              <label htmlFor="brand2"> Champion</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="brand3"
                name="brand"
                value="Under_Armour"
                checked={filters.brand.Under_Armour}
                onChange={(e) => updateFilters(e)}
              />
              <label htmlFor="brand3"> Under Armour</label>
            </div>
          </FilterGroup>
          <FilterGroup>
            <p>Price</p>
            <div>
              <input
                type="checkbox"
                id="price1"
                name="price"
                value="upTo20"
                checked={filters.price.upTo20}
                onChange={(e) => updateFilters(e)}
              />
              <label htmlFor="price1"> Up to $20</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="price2"
                name="price"
                value="from20To25"
                checked={filters.price.from20To25}
                onChange={(e) => updateFilters(e)}
              />
              <label htmlFor="price2"> $20 to $25</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="price3"
                name="price"
                value="from25To30"
                checked={filters.price.from25To30}
                onChange={(e) => updateFilters(e)}
              />
              <label htmlFor="price3"> $25 to $30</label>
            </div>
          </FilterGroup>
        </FilterWrapper>
        {items.length > 0 ? (
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
        ) : (
          <StyledP>No results found.</StyledP>
        )}
      </ItemsFiltersWrapper>
    </>
  );
};

const SorterWrapper = styled.div`
  display: flex;
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
  padding: 0.15rem 0.25rem;
  margin-right: 2rem;
  background-color: #fff;
  border-radius: 6px;
`;

const ItemsFiltersWrapper = styled.div`
  display: flex;
  padding: 4rem 6rem 2rem;
`;

const FilterWrapper = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  font-size: 14px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & p {
    font-weight: 700;
    margin-bottom: 4px;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  width: 85%;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
`;

const StyledP = styled.p`
  text-align: center;
`;

export default Shop;
