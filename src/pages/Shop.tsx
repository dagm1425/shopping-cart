import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ItemCard from "../components/ItemCard";
import { Item } from "../typings/sharedTypes";
import { Filters } from "../typings/sharedTypes";
import { IoIosArrowDown } from "react-icons/io";

interface ShopProps {
  sortItems: (
    sorting: "sortDefault" | "sortPriceLtoH" | "sortPriceHtoL"
  ) => void;
  items: Item[];
  addToCart: (id: string) => void;
  filters: Filters;
  updateFilters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  sorting: string;
}

const Shop: React.FC<ShopProps> = ({
loadItems,
  sortItems,
  items,
  addToCart,
  filters,
  updateFilters,
  resetFilters,
  sorting,
}) => {
  const [collapsedFilters, setCollapsedFilters] = useState({
    gender: true,
    brand: true,
    price: true,
  });

  useEffect(() => {
    loadItems();
    resetFilters();
  }, []);

  return (
    <>
      <SorterWrapper>
        <p>Sort</p>
        <StyledSelect
          value={sorting}
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
            <FilterHeader
              $collapsed={collapsedFilters.gender}
              onClick={() =>
                setCollapsedFilters((prevState) => ({
                  ...prevState,
                  gender: !prevState.gender,
                }))
              }
            >
              <p>Sportswear for</p>
              <IoIosArrowDown />
            </FilterHeader>
            <StyledHr />
            <FiltersInnerWrapper $collapsed={collapsedFilters.gender}>
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
            </FiltersInnerWrapper>
          </FilterGroup>

          <FilterGroup>
            <FilterHeader
              $collapsed={collapsedFilters.brand}
              onClick={() =>
                setCollapsedFilters((prevState) => ({
                  ...prevState,
                  brand: !prevState.brand,
                }))
              }
            >
              <p>Brand</p>
              <IoIosArrowDown />
            </FilterHeader>
            <StyledHr />
            <FiltersInnerWrapper $collapsed={collapsedFilters.brand}>
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
            </FiltersInnerWrapper>
          </FilterGroup>
          <FilterGroup>
            <FilterHeader
              $collapsed={collapsedFilters.price}
              onClick={() =>
                setCollapsedFilters((prevState) => ({
                  ...prevState,
                  price: !prevState.price,
                }))
              }
            >
              <p>Price</p>
              <IoIosArrowDown />
            </FilterHeader>
            <StyledHr />
            <FiltersInnerWrapper $collapsed={collapsedFilters.price}>
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
            </FiltersInnerWrapper>
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
  padding: 2rem 4.5rem 2rem;
`;

const FilterWrapper = styled.div`
  width: 18%;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  font-size: 14px;
  padding-right: 1.25rem;
  padding-top: 1.25rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    font-weight: 700;
  }
`;

const FilterHeader = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  & svg {
    transition: transform 0.3s ease-in-out;
    transform: ${({ $collapsed }) =>
      $collapsed ? "rotate(180deg)" : "rotate(0)"};
  }
`;

const FiltersInnerWrapper = styled.div<{ $collapsed: boolean }>`
  max-height: ${({ $collapsed }) => ($collapsed ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  & div {
    margin-bottom: 0.375rem;
  }
`;

const StyledHr = styled.hr`
  margin: 0.625rem 0;
  opacity: 0.6;
`;

const ItemsGrid = styled.div`
  display: grid;
  width: 82%;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

const StyledP = styled.p`
  text-align: center;
`;

export default Shop;
