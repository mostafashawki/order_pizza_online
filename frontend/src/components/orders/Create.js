import React, { Component } from "react";
import { Link } from "react-router-dom";
import { api } from "../const";
import accounting from "accounting";
const user = JSON.parse(sessionStorage.getItem("user"));
export class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pizzas: [],
      sizes: [],
      order: {
        customer: user.id, // for simplicity now, in real application we don't use user id directly, we use authorization in header using something like JWT
        status: "in-progress",
        items: []
      },
      selectedType: "",
      selectedTypeIndex: null,
      totalPrice: null,
      isSubmitted: false,
      isTypeSelected: false
    };
  }

  componentDidMount() {
    //get pizza products only (our store can has many others like (sandwiches, desserts,etc...))
    const url = api + "/products/pizza";
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
      .then(data => {
        console.log("RETREIVED DATA IS: XXXXXXXXXXX", data);
        this.setState({ pizzas: data.specs });
        console.log("PRO is *******", this.state.pizzas);
      })
      .catch(err => console.log(err));
  }

  handleSelectType = (val, index) => {
    const isTypeSelected = this.state.isTypeSelected;
    const order = this.state.order;
    if (!isTypeSelected) {
      order.items.push({
        name: "pizza",
        type: val,
        size: "",
        price: 0,
        qty: 0
      });
      //if he clicked on many types before and not selecting size, then just modified the last pushed one
    } else {
      order.items[order.items.length - 1].type = val;
    }
    console.log("----orders", order);
    this.setState({ order });
    let sizes = [];
    sizes = this.state.pizzas[index].sizes;
    console.log("-------sizes", sizes);
    this.setState({ sizes });
    this.setState({ selectedType: val });
    this.setState({ selectedTypeIndex: index });
    this.setState({ isTypeSelected: true });
  };

  handleSelectSize = (size, price) => {
    console.log("s", size);
    console.log("p", price);
    const selectedType = this.state.selectedType;
    const selectedTypeIndex = this.state.selectedTypeIndex;
    const order = this.state.order;
    //find if selected or not
    let foundIndex = order.items.findIndex(
      item => item.size === size && item.type == selectedType
    );
    console.log("____", foundIndex);
    if (foundIndex > -1) {
      order.items[foundIndex].qty = order.items[foundIndex].qty + 1;
      console.log("#$$", order.items);
      //pop the last item in array (no need)
      order.items.pop();
    } else {
      //modify the last added items
      order.items[selectedTypeIndex].size = size;
      order.items[selectedTypeIndex].price = price;
      order.items[selectedTypeIndex].qty = 1;
    }

    // console.log("*******", test);
    console.log("*******", order.items);
    //reset sizes, because we don't need it after selection
    this.setState({ sizes: [] });
    //now calculate the total price
    let totalPrice = 0;
    order.items.forEach(element => {
      totalPrice += element.qty * element.price;
    });
    this.setState({ totalPrice });
    this.setState({ order });
    this.setState({ isTypeSelected: false });
  };

  submitOrder = () => {
    console.log("to submit>>>>>", this.state.order);
    const orderS = JSON.stringify(this.state.order);
    const url = api + "/order";
    const options = {
      method: "POST",
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
          console.log("NEW ORDER IS", data);
          this.setState({ isSubmitted: true });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const pizzas = this.state.pizzas;
    const sizes = this.state.sizes;
    const order = this.state.order;
    const totalPrice = this.state.totalPrice;
    const isSubmitted = this.state.isSubmitted;

    console.log(pizzas);
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {isSubmitted ? (
          <h2 style={{ marginTop: "150px" }}>
            Thank you for your order, you can edit / track order(s){" "}
            <Link to="/orders">here</Link>
          </h2>
        ) : (
          <div style={{ marginTop: "10px" }}>
            <h2>ORDER NOW :)</h2>
            <h4>Select your favorite type:</h4>
            <ul
              className="checkbox-icon"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {pizzas
                ? pizzas.map((item, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={index}
                        name="type"
                        onClick={() => this.handleSelectType(item.type, index)}
                      />
                      <img
                        style={{ width: "200px", height: "200px" }}
                        src={item.imgUrl}
                      />
                      <br />
                      <label for={index} title={item.type} />
                    </li>
                  ))
                : null}
            </ul>

            <ul
              className="checkbox-icon"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {sizes
                ? sizes.map((item, index) => (
                    <li>
                      <input
                        type="checkbox"
                        id={"s" + index}
                        name="size"
                        onClick={() =>
                          this.handleSelectSize(item.size, item.price)
                        }
                      />
                      <label for={"s" + index}>
                        <i
                          className={
                            item.size == "S"
                              ? "fas fa-pizza-slice fa-2x"
                              : item.size == "M"
                              ? "fas fa-pizza-slice fa-3x"
                              : item.size == "L"
                              ? "fas fa-pizza-slice fa-4x"
                              : null
                          }
                        />
                        <br />
                        <br />
                        {item.size}
                        <br />
                        <br />
                        {"€ " + item.price}
                      </label>
                    </li>
                  ))
                : null}
            </ul>
            {totalPrice > 0 ? (
              <React.Fragment>
                <h3>Order Summary</h3>
                <h4>User Details:</h4>
                <ul>
                  <li>Name: {user.name}</li>
                  <li>Email: {user.email}</li>
                  <li>Address: {user.address}</li>
                </ul>
              </React.Fragment>
            ) : null}
            <br />
            {totalPrice ? (
              <span className="badge-success">
                Total {accounting.formatMoney(totalPrice, "€", 2, ".")}
              </span>
            ) : null}
            {order.items
              ? order.items.map((item, index) =>
                  item.qty > 0 ? (
                    <div className="list">
                      <p>
                        Type: {item.type}, Size: {item.size}, Price:{" "}
                        {item.price}, Qty: {item.qty}
                      </p>
                    </div>
                  ) : null
                )
              : null}

            {totalPrice > 0 ? (
              <a
                href="javascript:void(0)"
                className="button-small"
                onClick={this.submitOrder}
              >
                Submit Order
              </a>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default Create;
