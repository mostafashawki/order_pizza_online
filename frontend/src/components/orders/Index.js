import React, { Component } from "react";
import { Redirect, Route, Link } from "react-router-dom";
import { api } from "../const";
import Details from "./Details";
const user = JSON.parse(sessionStorage.getItem("user"));
export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      selectedOrder: {}
    };
  }

  componentDidMount() {
    if (!this.props.location.state) {
      //means got from edit so no need to fetch from server
      console.log("go to server");
      const url = api + `/orders/${user.id}`;
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      };

      //////////////////////////////////////
      fetch(url, options)
        .then(res => res.json())
        .then(orders => {
          console.log("my ORDERS ARE: ####", orders);
          this.setState({ orders });
        })
        .catch(err => console.log(err));
    } else {
      console.log("got from edit");
      console.log(this.props.location.state.orders);
      this.setState({ orders: this.props.location.state.orders });
    }
  }

  // selectOrder = order => {
  //   console.log("===", order);
  //   this.props.history.push({
  //     pathname: "/order-details",
  //     state: { ...order }
  //   });
  // };
  selectOrder = index => {
    const orders = this.state.orders;
    // console.log("===", order);
    this.props.history.push({
      pathname: `/order-details/${index}`,
      state: { orders }
    });
  };
  filter(e) {
    this.setState({ filter: e.target.value });
  }
  render() {
    let orders = this.state.orders;
    if (this.state.filter) {
      orders = orders.filter(item =>
        item.status.toLowerCase().includes(this.state.filter.toLowerCase())
      );
    }
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginTop: "10px" }}>
          <h2>MY ORDERS</h2>
          <input
            type="text"
            placeholder="search by status"
            onChange={this.filter.bind(this)}
          />
          {orders
            ? orders.map((order, index) => (
                <div key={order.urlId} className="list">
                  <Link
                    to={{
                      pathname: `/order-details/${index}`,
                      state: { orders }
                    }}
                  >
                    <i class="fas fa-bars" />
                  </Link>{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => this.selectOrder(index)}
                  >
                    {order.status} <strong>@</strong>{" "}
                    {new Date(order.date).toLocaleString()}{" "}
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}
