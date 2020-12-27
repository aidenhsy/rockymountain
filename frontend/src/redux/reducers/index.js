import { combineReducers } from "redux";
import {
  productListReducer,
  productDetailsReducer,
  productAdminListReducer,
  productUpdateReducer,
  productDeleteReducer,
  productCreateReducer,
  productReviewCreateReducer,
} from "./productReducers";
import { cartReducer } from "./cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userProfileUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./orderReducers";

const allReducers = combineReducers({
  //PRODUCT
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productAdminList: productAdminListReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productReviewCreate: productReviewCreateReducer,

  //USER
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  //CART
  cart: cartReducer,

  //ORDER
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMy: orderMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

export default allReducers;
