import React, { useEffect } from "react";

//Presentation
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../redux/actions/orderActions";

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  //Calculations
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      {" "}
      <h1>Order ID: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping Address:</h4>
              Address: {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <strong>Method: </strong>
              {order.paymentMethod}
              {order.isPaid ? (
                <Message variant="success">Paid</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Delivery</h4>
              {order.isDelivered ? (
                <Message variant="success">Delivered</Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Order Items</h4>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
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
                <Col>
                  ${" "}
                  {addDecimals(
                    order.orderItems.reduce(
                      (accumulator, item) =>
                        accumulator + item.price * item.qty,
                      0
                    )
                  )}{" "}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping: </Col>
                <Col>$ {order.shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total: </Col>
                <Col>$ {order.totalPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            {error && (
              <ListGroup.Item>
                <Message>{error}</Message>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
