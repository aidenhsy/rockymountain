import HomeScreen from "./HomeScreen";
import ProductScreen from "./ProductScreen";

//User
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ProfileScreen from "./ProfileScreen";

//Cart
import CartScreen from "./CartScreen";

//Order
import ShippingScreen from "./ShippingScreen";
import PaymentScreen from "./PaymentScreen";
import PlaceOrderScreen from "./PlaceOrderScreen";
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
};

export default screens;
