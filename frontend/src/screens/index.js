import HomeScreen from "./HomeScreen";
import ProductScreen from "./ProductScreen";
import CartScreen from "./CartScreen";

//User
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ProfileScreen from "./ProfileScreen";
import UserListScreen from "./UserListScreen";

//Checkout
import ShippingScreen from "./ShippingScreen";
import PaymentScreen from "./PaymentScreen";
import PlaceOrderScreen from "./PlaceOrderScreen";

//Order
import OrderScreen from "./OrderScreen";

const screens = {
  Home: HomeScreen,
  Product: ProductScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  Profile: ProfileScreen,
  Cart: CartScreen,
  Shipping: ShippingScreen,
  Payment: PaymentScreen,
  PlaceOrder: PlaceOrderScreen,
  Order: OrderScreen,
  UserList: UserListScreen,
};

export default screens;
