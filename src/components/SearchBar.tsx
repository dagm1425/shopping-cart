import React, { useEffect } from "react";
import SearchResultsLink from "./SearchResultsLink";
import { Item } from "src/typings/sharedTypes";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";

interface SearchBarProps {
  items: Item[];
  search: string;
  setSearch: (value: string) => void;
  searchResults: Item[];
  setSearchResults: (value: Item[]) => void;
  isSearchBarOpen: boolean;
  toggleSearchBar: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  items,
  search,
  setSearch,
  searchResults,
  setSearchResults,
  isSearchBarOpen,
  toggleSearchBar,
}) => {
  useEffect(() => {
    searchItems();
  }, [search]);

  const searchItems = () => {
    const regExp = new RegExp(search, "gi");
    const results = search
      ? items.filter((item) => regExp.test(item.title))
      : [];

    setSearchResults(results);
  };

  const renderSearchResults = () => {
    return search && !searchResults.length ? (
      <div>No results found.</div>
    ) : (
      searchResults.map((result) => (
        <SearchResultsLink
          key={result.id}
          result={result}
          toggleSearchBar={toggleSearchBar}
        />
      ))
    );
  };

  const closeSearch = () => {
    setSearch("");
    toggleSearchBar();
  };

  return (
    <>
      <SearchResultsContainer $isSearchBarOpen={isSearchBarOpen}>
        <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <StyledIcon>
            <IoIosSearch />
          </StyledIcon>
          <CloseBtn>
            <IoCloseOutline onClick={closeSearch} />
          </CloseBtn>
        </SearchBarContainer>
        {searchResults.length > 0 && (
          <>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                paddingBottom: "0.5rem",
              }}
            >
              products
            </p>

            <hr style={{ marginBottom: "1rem", opacity: "0.5" }} />
          </>
        )}
        {renderSearchResults()}
      </SearchResultsContainer>
      <Overlay
        $isSearchBarOpen={isSearchBarOpen}
        onClick={closeSearch}
      ></Overlay>
    </>
  );
};

const SearchResultsContainer = styled.div<{ $isSearchBarOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
  width: 40%;
  display: ${({ $isSearchBarOpen }) => ($isSearchBarOpen ? "block" : "none")};
  background-color: #fff;
  opacity: ${({ $isSearchBarOpen }) => ($isSearchBarOpen ? "1" : "0")};
  padding: 1rem 1rem 2rem;
  overflow-y: auto;
  z-index: 10;
  border: 3px solid #eee;
  border-radius: 30px;
  transition: 200ms ease-in-out;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 575px) {
    width: 80%;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  margin-bottom: 1.25rem;
`;

const SearchInput = styled.input`
  position: absolute;
  left: 0;
  height: 100%;
  width: 90%;
  font-size: 1rem;
  background-color: #eee;
  padding: 0.75rem 3rem;
  margin-bottom: 1.75rem;
  border-radius: 30px;
  border: none;
  outline: none;
`;

const CloseBtn = styled.a`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  margin-top: 2px;
  cursor: pointer;
`;

const StyledIcon = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  color: #a6a6a6;
  margin-top: 2px;
  padding-left: 1rem;
`;

const Overlay = styled.div<{ $isSearchBarOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ $isSearchBarOpen }) => ($isSearchBarOpen ? "1" : "0")};
  background-color: rgba(0, 0, 0, 0.3);
  transition: 200ms ease-in-out;
  z-index: 4;
  pointer-events: ${({ $isSearchBarOpen }) =>
    $isSearchBarOpen ? "all" : "none"};
`;
export default SearchBar;
