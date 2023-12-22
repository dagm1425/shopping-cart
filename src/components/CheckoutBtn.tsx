import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import MainBtn from "./MainBtn";

const stripePromise = loadStripe(
  "pk_test_51OPfxkKFC2d2TlDtjPrzMQN3Tcq1y7hZVAphJrrAWQDVrf0Vk3BX2U3Py4QhOi49C2n47DGki9qzaDwURgnSs1i5009BDd3H2L"
);

interface Item {
  price: string;
  quantity: number;
}

interface CheckoutBtnProps {
  lineItems: Item[];
}

const CheckoutBtn: React.FC<CheckoutBtnProps> = ({ lineItems }) => {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe loading failed");
      return;
    }

    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems,
        mode: "payment",
        successUrl: "http://localhost:3000/payment-success",
        cancelUrl: "http://localhost:3000/shop",
      });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainBtn style={{ margin: "4.5rem 0rem" }} onClick={handleClick}>
      Checkout
    </MainBtn>
  );
};

export default CheckoutBtn;
