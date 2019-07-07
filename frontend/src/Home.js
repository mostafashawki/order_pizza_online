import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function Home() {
  //generate user here
  const user = {
    id: "5d1b6e01e0d2b078e254db2b",
    email: "jerry@gmail.com",
    name: "Jerry T Herrera",
    address: "2241  Larry Street, New Berlin"
  };
  //put it into session storage
  sessionStorage.setItem("user", JSON.stringify(user));

  return (
    <div className="landing">
      <div className="cover">
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto"
            // position: "absolute",
            // top: "200px"
          }}
        >
          <div className="inner">
            <p>Hi {user.name}</p>
            <h1 style={{ fontFamily: "Barriecito", fontSize: "5rem" }}>
              Pizza
              <i className="fas fa-pizza-slice" />
              Fun
            </h1>
            <Link to="/order" className="button-danger">
              ORDER NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
