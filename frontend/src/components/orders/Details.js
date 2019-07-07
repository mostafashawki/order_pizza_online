import React from "react";
import { api } from "../const";
let orders = [];
let order = {};
let index = null;

export default function Details(props) {
  console.log("***", props);
  index = props.match.params.id;
  orders = props.location.state.orders;
  order = orders[index];

  const cancelOrder = () => {
    order.status = "canceled";
    const orderS = JSON.stringify(order);
    const url = api + "/order";
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: orderS
    };
    //////////////////////////////////////
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        if (data) {
          //update orders first
          orders[index] = data;
          // props.history.push("/orders");
          //go to index with the new orders
          props.history.push({
            pathname: `/orders`,
            state: { orders }
          });
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginTop: "10px" }}>
        <h2>MY ORDER DETAILS</h2>
        {order.status !== "canceled" ? (
          <div className="containerProgress">
            <ul className="progressbar">
              <li className="active">
                <i class="fas fa-sync-alt" /> In Progress
              </li>
              <li
                className={
                  order.status === "out-for-delivery" ||
                  order.status === "delivered"
                    ? "active"
                    : ""
                }
              >
                <i class="fas fa-motorcycle" /> Out For Delivery
              </li>
              <li className={order.status === "delivered" ? "active" : ""}>
                <i class="fas fa-check-circle" /> Delivered
              </li>
            </ul>
          </div>
        ) : (
          <span className="badge">canceled</span>
        )}

        {order.items
          ? order.items.map((item, index) =>
              item.qty > 0 ? (
                <div className="list">
                  <p>
                    Type: {item.type}, Size: {item.size}, Price: {item.price},
                    Qty: {item.qty}
                  </p>
                </div>
              ) : null
            )
          : null}
        {order.status === "in-progress" ? (
          <a
            href="javascript:void(0)"
            className="button-danger"
            onClick={cancelOrder}
          >
            Your order still in progress, do you want to cancel it?
          </a>
        ) : null}
      </div>
    </div>
  );
}
