import React, { useState } from "react";

//Presentational
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";

//Redux
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select your payment method</Form.Label>
          <Form.Check
            type="radio"
            name="paymentMethod"
            label="PayPal or Credit Card"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check
            type="radio"
            name="paymentMethod"
            label="Stripe"
            value="Stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Form.Group>
        <Button type="submit">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
