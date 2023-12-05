import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <H1>sweat in style</H1>
      <p>Grab your sportswear from our collection of renowned brands</p>
      <Link to="/shop">
        <Button>shop now</Button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 75%;
  font-size: 1.25em;
  color: #fff;
  margin: 0 auto;
  padding-top: 9rem;
`;

const H1 = styled.h1`
  letter-spacing: 0.05rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const Button = styled.button`
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  font-weight: 700;
  width: 15%;
  padding: 1.25rem 1rem;
  text-transform: uppercase;
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 200ms ease-in-out;
  z-index: 1;
  box-shadow: 0px 0px 0 #000;

  &:hover {
    box-shadow: 5px 5px 0 #000, 5px 5px 0 1px #fff;
  }
`;

export default Home;
