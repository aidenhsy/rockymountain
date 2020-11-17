import React, { useState, useEffect } from "react";

//Redux
import { getProfile, updateProfile } from "../redux/actions/userActions";
import { getMyOrders } from "../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { USER_PROFILE_UPDATE_RESET } from "../redux/constants";

//Presentational
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.userLogin);
  const { user } = useSelector((state) => state.userProfile);
  const { success } = useSelector((state) => state.userProfileUpdate);
  const { orders } = useSelector((state) => state.orderMy);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        dispatch(getProfile("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, user, userInfo, dispatch, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ _id: user._id, name, email, password }));
  };
  return (
    <Row>
      <Col md={3}>
        <h1>Profile</h1>
        {success && <h2>success</h2>}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>Cart Items</h1>
        <ListGroup variant="flush">
          {orders.map((order) => (
            <ListGroup.Item>
              <Link to={`/orders/${order._id}`}>
                <h5>order ID: {order._id}</h5>
              </Link>
              {order.orderItems.map((item) => (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} fluid rouded />
                      </Col>
                      <Col md={8}>{item.name}</Col>
                      <Col md={2}>Qty: {item.qty}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
