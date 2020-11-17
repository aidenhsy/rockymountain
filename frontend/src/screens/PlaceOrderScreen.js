import React, { useEffect } from "react";

//Presentation
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../redux/actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  //Calculations
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const subTotal = addDecimals(
    cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.qty,
      0
    )
  );
  const taxPrice = addDecimals(subTotal * 0.13);
  const shippingPrice =
    subTotal < 100 ? addDecimals(Number(10)) : addDecimals(Number(0));
  const totalPrice = addDecimals(
    Number(subTotal) + Number(taxPrice) + Number(shippingPrice)
  );

  const dispatch = useDispatch();

  const { order, success, error } = useSelector((state) => state.orderCreate);

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping Address:</h4>
              Address: {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Order Items</h4>
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={3}>
                        <Image src={item.image} fluid rounded />
                      </Col>
                      <Col md={5}>
                        <strong>{item.name}</strong>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price.toFixed(2)}= $
                        {(item.price * item.qty).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Subtotal: </Col>
                <Col>$ {subTotal} </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping: </Col>
                <Col>{subTotal > 100 ? "$ 0.00" : `$ ${shippingPrice}`} </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total: </Col>
                <Col>$ {totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {error && (
              <ListGroup.Item>
                <Message>{error}</Message>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <Button className="btn-block" onClick={placeOrderHandler}>
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
