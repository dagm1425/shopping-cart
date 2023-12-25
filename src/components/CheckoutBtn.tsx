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

    alert("Use 4242424242424242 as test card to process payment");

    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe loading failed");
      return;
    }

    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems,
        mode: "payment",
        successUrl: "https://dn-shopping-cart.netlify.app/payment-success",
        cancelUrl: "https://dn-shopping-cart.netlify.app/shop",
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
