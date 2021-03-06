import React, { useEffect } from "react";

//Redux
import {
  adminListProducts,
  deleteProduct,
  createProduct,
} from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../redux/constants";

//Presentational
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.productAdminList
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successDelete, error: errorDelete } = useSelector(
    (state) => state.productDelete
  );
  const {
    success: successCreate,
    product: createdProduct,
    loading: loadingCreate,
    error: errorCreate,
  } = useSelector((state) => state.productCreate);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(adminListProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    createdProduct,
    successCreate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm(`Are you sure you what to delete?`)) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>STOCK</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
