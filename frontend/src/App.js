import React from "react";
import { Route, HashRouter } from "react-router-dom";
import "./App.css";
import OrderCreate from "./components/orders/Create";
import Orders from "./components/orders/Index";
import OrderDetails from "./components/orders/Details";
import Home from "./Home";

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Home} />
      <Route path="/order" component={OrderCreate} />
      <Route path="/orders" component={Orders} />
      <Route path="/order-details/:id" component={OrderDetails} />
    </HashRouter>
  );
}

export default App;
