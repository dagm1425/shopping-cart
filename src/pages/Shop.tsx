import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ItemCard from "../components/ItemCard";
import { Item } from "../typings/sharedTypes";
import { Filters } from "../typings/sharedTypes";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useAppContext } from "src/context/context";
import products from "src/data/allProducts";

interface ShopProps {
  items: Item[];
  addToCart: (id: string) => void;
}

const Shop: React.FC<ShopProps> = ({ items, addToCart }) => {
  const { state, dispatch } = useAppContext();
  const sorting = state.sorting;
  const filters = state.filters;
  const [collapsedFilters, setCollapsedFilters] = useState({
    gender: true,
    brand: true,
    price: true,
  });
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);

  useEffect(() => {
    if (areFiltersSet()) resetFilters();
  }, []);

  useEffect(() => {
    filterItems();
  }, [filters]);

  useEffect(() => {
    sorting === "sortDefault"
      ? sortDefault()
      : sorting === "sortPriceLtoH"
      ? sortPriceLtoH()
      : sortPriceHtoL();
  }, [sorting]);

  const areFiltersSet = () => {
    const { gender, brand, price } = filters;

    for (const genderKey in gender) {
      if (gender[genderKey]) return true;
    }

    for (const brandKey in brand) {
      if (brand[brandKey]) return true;
    }

    for (const priceKey in price) {
      if (price[priceKey]) return true;
    }

    return false;
  };

  const sortItems = (
    sorting: "sortDefault" | "sortPriceLtoH" | "sortPriceHtoL"
  ) => {
    dispatch({ type: "SET_SORTING", payload: sorting });
  };

  const sortDefault = () => {
    const sortedItems = items
      .slice()
      .sort((a, b) => products.indexOf(a) - products.indexOf(b));
    dispatch({ type: "SET_ITEMS", payload: sortedItems });
  };

  const sortPriceLtoH = () => {
    const sortedItems = items.slice().sort((a, b) => a.price - b.price);
    dispatch({ type: "SET_ITEMS", payload: sortedItems });
  };

  const sortPriceHtoL = () => {
    const sortedItems = items.slice().sort((a, b) => b.price - a.price);
    dispatch({ type: "SET_ITEMS", payload: sortedItems });
  };

  const updateFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.name as keyof Filters;
    const val = e.target.value as string;

    dispatch({
      type: "TOGGLE_FILTER",
      payload: {
        param,
        val,
      },
    });
  };

  const collectFilters = () => {
    interface AppliedFilters {
      [key: string]: string[];
    }

    const { gender, brand, price } = filters;
    const appliedFilters: AppliedFilters = {
      gender: [],
      brand: [],
      price: [],
    };

    for (const genderKey in gender) {
      if (gender[genderKey]) appliedFilters.gender.push(genderKey);
    }

    for (const brandKey in brand) {
      if (brand[brandKey]) appliedFilters.brand.push(brandKey);
    }

    for (const priceKey in price) {
      if (price[priceKey]) appliedFilters.price.push(priceKey);
    }

    return appliedFilters;
  };

  const filterItems = () => {
    const filters = collectFilters();
    const keys = Object.keys(filters);

    const filteredItems = products.filter((product) => {
      return keys.every((key) => {
        if (!filters[key].length) return true;
        if (key === "price") {
          return filters[key].every((priceKey) => {
            if (priceKey === "upTo20") return product[key] <= 20;
            else if (priceKey === "from20To25")
              return product[key] > 20 && product[key] <= 25;
            else if (priceKey === "from25To30")
              return product[key] > 25 && product[key] <= 30;
          });
        }
        return filters[key].includes(product[key as keyof typeof product]);
      });
    });

    dispatch({ type: "SET_ITEMS", payload: filteredItems });
  };

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  return (
    <>
      <SorterWrapper>
        <DrawerBtn onClick={() => setIsFiltersDrawerOpen(true)}>
          <IconContext.Provider
            value={{
              style: { fontSize: "26px", color: "#000" },
            }}
          >
            <HiOutlineAdjustmentsHorizontal />
          </IconContext.Provider>
        </DrawerBtn>
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
      <Main>
        <FilterWrapper $isFiltersDrawerOpen={isFiltersDrawerOpen}>
          <FiltersHeader>
            <p>Filter</p>
            <CloseBtn onClick={() => setIsFiltersDrawerOpen(false)}>
              <IconContext.Provider
                value={{
                  style: { fontSize: "22px", color: "#000" },
                }}
              >
                <AiOutlineClose />
              </IconContext.Provider>
            </CloseBtn>
          </FiltersHeader>
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
              <CheckBox>
                <input
                  type="checkbox"
                  id="gender1"
                  name="gender"
                  value="man"
                  checked={filters.gender.man}
                  onChange={(e) => updateFilters(e)}
                />
                <label htmlFor="gender1"> Men</label>
              </CheckBox>
              <CheckBox>
                <input
                  type="checkbox"
                  id="gender2"
                  name="gender"
                  value="woman"
                  checked={filters.gender.woman}
                  onChange={(e) => updateFilters(e)}
                />
                <label htmlFor="gender2"> Women</label>
              </CheckBox>
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
              <CheckBox>
                <input
                  type="checkbox"
                  id="brand1"
                  name="brand"
                  value="Hanes"
                  checked={filters.brand.Hanes}
                  onChange={(e) => updateFilters(e)}
                />
                <label htmlFor="brand1"> Hanes</label>
              </CheckBox>
              <CheckBox>
                <input
                  type="checkbox"
                  id="brand2"
                  name="brand"
                  value="Champion"
                  checked={filters.brand.Champion}
                  onChange={(e) => updateFilters(e)}
                />
                <label htmlFor="brand2"> Champion</label>
              </CheckBox>
              <CheckBox>
                <input
                  type="checkbox"
                  id="brand3"
                  name="brand"
                  value="Under_Armour"
                  checked={filters.brand.Under_Armour}
                  onChange={(e) => updateFilters(e)}
                />
                <label htmlFor="brand3"> Under Armour</label>
              </CheckBox>
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
              <CheckBox>
                <input
                  type="checkbox"
                  id="price1"
                  name="price"
                  value="upTo20"
                  checked={filters.price.upTo20}
                  onChange={(e) => updateFilters(e)}
                />
                <label htmlFor="price1"> Up to $20</label>
              </CheckBox>
              <CheckBox>
                <input
                  type="checkbox"
                  id="price2"
                  name="price"
                  value="from20To25"
                  checked={filters.price.from20To25}
                  onChange={(e) => updateFilters(e)}
                />
                <label htmlFor="price2"> $20 to $25</label>
              </CheckBox>
              <CheckBox>
                <input
                  type="checkbox"
                  id="price3"
                  name="price"
                  value="from25To30"
                  checked={filters.price.from25To30}
                  onChange={(e) => updateFilters(e)}
                />
                <label htmlFor="price3"> $25 to $30</label>
              </CheckBox>
            </FiltersInnerWrapper>
          </FilterGroup>
          <FilterBtnWrapper>
            <FilterBtn onClick={resetFilters}>clear all</FilterBtn>
            <FilterResultsBtn onClick={() => setIsFiltersDrawerOpen(false)}>
              view results
            </FilterResultsBtn>
          </FilterBtnWrapper>
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
      </Main>
    </>
  );
};

const Main = styled.div`
  display: flex;
  padding: 2rem 4.5rem 2rem;

  @media (max-width: 1024px) {
    padding: 0.25rem 2rem 1rem;
  }

  @media (max-width: 575px) {
    padding: 0rem 1.25rem 1rem;
  }
`;

const SorterWrapper = styled.div`
  display: flex;
  background-color: #f7f7f7;
  font-size: 14px;
  padding: 0.75rem 0;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  border-radius: 6px;

  @media (max-width: 575px) {
    padding: 0.25rem 0;
  }
`;

const DrawerBtn = styled.button`
  display: none;

  @media (max-width: 575px) {
    display: block;
    font-size: 14px;
    font-weight: 700;
    margin-right: auto;
    padding: 0.5rem 2rem;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

const StyledSelect = styled.select`
  font: inherit;
  text-transform: capitalize;
  padding: 0.15rem 0.25rem;
  margin-right: 2rem;
  background-color: #fff;
  border-radius: 6px;
`;

const FilterWrapper = styled.div<{ $isFiltersDrawerOpen: boolean }>`
  width: 18%;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  font-size: 14px;
  padding-right: 1.25rem;
  padding-top: 1.25rem;

  @media (max-width: 575px) {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    right: 0;
    padding-left: 1.25rem;
    background-color: #fff;
    transform: ${({ $isFiltersDrawerOpen }) =>
      $isFiltersDrawerOpen ? "translateX(0%)" : "translateX(-100%)"};
    transition: 200ms ease-in-out;
    z-index: 30;
    overflow-y: auto;
  }
`;

const FiltersHeader = styled.div`
  display: none;

  @media (max-width: 575px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 0.325rem;
    margin-bottom: 1rem;

    & svg {
      margin-top: 2px;
    }

    & p {
      font-size: 1.125rem;
      text-transform: uppercase;
    }
  }
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    font-weight: 700;
  }

  @media (max-width: 575px) {
    width: 85%;
    margin: 0 auto;
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
`;

const CheckBox = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.425rem;
`;

const StyledHr = styled.hr`
  margin: 0.625rem 0 1rem;
  opacity: 0.6;
`;

const FilterBtnWrapper = styled.div`
  display: none;

  @media (max-width: 575px) {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-top: 1.25rem;
  }
`;

const FilterBtn = styled.button`
  font-size: 0.9rem;
  width: 35%;
  font-weight: 700;
  background-color: transparent;
  text-transform: uppercase;
  padding: 1rem 0.375rem;
  border: 1px solid #000;
  outline: none;
  cursor: pointer;
  z-index: 1;
`;

const FilterResultsBtn = styled(FilterBtn)`
  color: #fff;
  background-color: #000;
`;

const ItemsGrid = styled.div`
  display: grid;
  width: 82%;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

  @media (max-width: 768px) {
    gap: 0;
  }

  @media (max-width: 575px) {
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(142px, 1fr));
    grid-row-gap: 1.5rem;
  }
`;

const StyledP = styled.p`
  text-align: center;
`;

export default Shop;
