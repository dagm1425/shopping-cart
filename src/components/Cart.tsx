import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Item } from "src/typings/sharedTypes";
import { useAppContext } from "src/context/context";
import CheckoutBtn from "./CheckoutBtn";
import MainBtn from "./MainBtn";

interface CartProps {
  cart: Item[];
  updateQuantity: (op: string, id: string) => void;
  toggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, toggleCart }) => {
  const { state } = useAppContext();
  const isCartOpen = state.cart.isCartOpen;
  const totalPrice = state.cart.totalPrice;

  const lineItems = cart.map((item) => ({
    price: item.priceId,
    quantity: item.quantity,
  }));
  const cartItems = cart.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      title={item.title}
      img={item.img}
      quantity={item.quantity}
      price={item.price}
      updateQuantity={updateQuantity}
    />
  ));

  return (
    <>
      <CartWrapper $active={isCartOpen}>
        <CartHeader>
          <p>Cart</p>
          <CloseBtn onClick={toggleCart}>
            <IconContext.Provider
              value={{
                style: {
                  fontSize: "22px",
                  color: "#000",
                },
              }}
            >
              <AiOutlineClose />
            </IconContext.Provider>
          </CloseBtn>
        </CartHeader>
        {cart.length ? (
          <LoadedCartWrapper>
            <div>
              <CartItemsWrapper>{cartItems}</CartItemsWrapper>
              <SubTotWrapper>
                <SubTotP>Subtotal:</SubTotP>
                <SubTotSpan>{"$" + totalPrice.toFixed(2)}</SubTotSpan>
              </SubTotWrapper>
            </div>
            <CheckoutBtn lineItems={lineItems} />
          </LoadedCartWrapper>
        ) : (
          <EmptyCartWrapper>
            <p style={{ fontSize: "1.125rem" }}>Your cart is empty.</p>
            <IconContext.Provider
              value={{
                style: {
                  fontSize: "10rem",
                  color: "#000",
                  opacity: "0.1",
                  margin: "0 auto",
                },
              }}
            >
              <AiOutlineShopping />
            </IconContext.Provider>
            <StyledLink to="/shop">
              <MainBtn onClick={toggleCart}>Browse items</MainBtn>
            </StyledLink>
          </EmptyCartWrapper>
        )}
      </CartWrapper>

      <Overlay $active={isCartOpen} onClick={toggleCart} />
    </>
  );
};

const CartWrapper = styled.div<{ $active?: boolean }>`
  position: fixed;
  width: 33%;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: #f7f7f7;
  transform: ${({ $active }) =>
    $active ? "translateX(0%)" : "translateX(100%)"};
  transition: 200ms ease-in-out;
  z-index: 40;
  overflow-y: auto;

  @media (max-width: 1024px) {
    width: 55%;
  }

  @media (max-width: 575px) {
    width: 100%;
  }
`;

const Overlay = styled.div<{ $active?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ $active }) => ($active ? "1" : "0")};
  transition: 200ms ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: ${({ $active }) => ($active ? "all" : "none")};
  z-index: 20;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  & svg {
    margin-top: 6px;
  }

  & p {
    font-size: 1.125rem;
    text-transform: uppercase;
  }
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const LoadedCartWrapper = styled.div`
  height: 92%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const EmptyCartWrapper = styled.div`
  height: 92%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
`;

const StyledLink = styled(Link)`
  width: 100%;
`;

const SubTotWrapper = styled.div`
  text-align: center;
  padding-top: 1rem;
`;

const SubTotP = styled.p`
  display: inline;
  font-weight: 700;
  text-transform: uppercase;
  margin-right: 0.5rem;
`;

const SubTotSpan = styled.span`
  font-size: 1.125rem;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export default Cart;
