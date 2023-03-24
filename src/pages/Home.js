/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Home({ rmBg }) {
  const linkStyle = { textDecoration: "none", color: "inherit" };

  return (
    <Container>
      <H1>sweat in style</H1>
      <p>Grab your sportswear from our collection of renowned brands</p>
      <Link style={linkStyle} to="/shop" onClick={rmBg}>
        <Button>shop now</Button>
      </Link>
    </Container>
  );
}

export default Home;

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

  // &:hover,
  // &:focus {
  //   color: #fff;
  // }

  // &:before {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   bottom: 0;
  //   right: 0;
  //   z-index: -1;
  //   background-color: #000;
  //   transition: 250ms ease-in-out;
  //   transform: scaleX(0);
  //   transform-origin: left;
  // }

  // &:hover::before,
  // &:focus::before {
  //   transform: scaleX(1);
  // }
`;
