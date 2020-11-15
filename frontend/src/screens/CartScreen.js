import React, { useEffect } from "react";

//Presentational
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search.split("=")[1];
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <div>
      <Row>
        <Col md={9}>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>{item.name}</Col>
                  <Col md={2}>$ {item.price.toFixed(2)}</Col>
                  <Col md={2}>
                    {" "}
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button className="btn-light">
                      <i
                        className="fas fa-trash"
                        onClick={() => removeFromCartHandler(item.product)}
                      ></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup.Item>
            <Row>
              <Col>Total: </Col>
              <Col>
                ${" "}
                {cartItems
                  .reduce(
                    (accumulator, item) => accumulator + item.qty * item.price,
                    0
                  )
                  .toFixed(2)}{" "}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button className="btn-block" onClick={checkoutHandler}>
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
