import React, { useEffect } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../redux/actions/orderActions";

//Presentational
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const PlaceOrderScreen = ({ history }) => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  const { success, order } = useSelector((state) => state.orderCreate);

  //Calculations
  const addDecimal = (num) => Math.round((num * 100) / 100).toFixed(2);
  const subtotal = addDecimal(
    cartItems.reduce(
      (accumulator, item) => accumulator + item.qty * item.price,
      0
    )
  );
  const taxPrice = addDecimal(subtotal * 0.13);
  const shippingPrice = addDecimal(subtotal < 100 ? Number(10) : Number(0));
  const totalPrice = addDecimal(
    Number(subtotal) + Number(taxPrice) + Number(shippingPrice)
  );

  //Create order
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        cartItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Cart Items</h2>
              {cartItems.map((item) => (
                <ListGroup variant="flush" key={item.product}>
                  <ListGroup>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} fluid rounded />
                      </Col>
                      <Col md={5}>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={5}>
                        {item.qty} x ${item.price} = ${item.price * item.qty}
                      </Col>
                    </Row>
                  </ListGroup>
                </ListGroup>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>SubTotal: </Col>
                  <Col>$ {subtotal}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>$ {taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>$ {shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>$ {totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
