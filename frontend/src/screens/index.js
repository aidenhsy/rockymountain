import HomeScreen from "./HomeScreen";
import ProductScreen from "./ProductScreen";
import CartScreen from "./CartScreen";

//User
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ProfileScreen from "./ProfileScreen";

//Checkout
import ShippingScreen from "./ShippingScreen";
import PaymentScreen from "./PaymentScreen";
import PlaceOrderScreen from "./PlaceOrderScreen";

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
};

export default screens;
