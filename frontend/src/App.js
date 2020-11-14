import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

//Presentational
import Header from "./components/Header";
import Footer from "./components/Footer";
import screens from "./screens";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="my-3">
        <Container>
          <Route exact path="/" component={screens.Home} />
          <Route exact path="/products/:id" component={screens.Product} />
          <Route path="/login" component={screens.Login} />
          <Route path="/register" component={screens.Register} />
          <Route path="/profile" component={screens.Profile} />
          <Route path="/cart/:id?" component={screens.Cart} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
