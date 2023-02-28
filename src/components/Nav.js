/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  const { cart, openCart } = props;
  const linkStyle = { textDecoration: "none", color: "inherit" };

  return (
    <nav>
      <Link style={linkStyle} to="/">
        <h2>FakeStore</h2>
      </Link>
      <ul>
        <Link style={linkStyle} to="/shop">
          <li>Shop</li>
        </Link>
        <li onClick={openCart}>{cart.length}</li>
      </ul>
    </nav>
  );
};

export default Nav;
