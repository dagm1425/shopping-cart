import React from "react";
import styled from "styled-components";
import { IoBagCheckSharp } from "react-icons/io5";

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 91vh;
`;

const ThankYouMessage = styled.h1`
  font-size: 2rem;
  margin: 3rem 0 1.5rem;
`;

const PaymentSuccess: React.FC = () => {
  return (
    <SuccessContainer>
      <IoBagCheckSharp
        style={{ fontSize: "8rem", color: "#008000", marginTop: "6rem" }}
      />
      <ThankYouMessage>Thank you for your purchase !</ThankYouMessage>
      <p>
        If you have any questions, please don’t hesitate to get in contact with
        us.
      </p>
    </SuccessContainer>
  );
};

export default PaymentSuccess;
