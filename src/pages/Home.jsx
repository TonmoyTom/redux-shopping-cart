import React, { useEffect, CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ReactImage from "../assets/react.svg";
import { addToCart, getCarts } from "../redux/features/cartStore";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { cartLists, loading, error } = useSelector((state) => state.allCart);

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);
  const send = (item) => {
    dispatch(addToCart(item));
    toast.success("Item add in your cart");
  };

  return (
    <>
      <section className="item_section mt-4 container">
        <h3 className="px-4" style={{ fontWeight: 400 }}>
          Restaurant is open now
        </h3>
        <div className="row mt-2 mb-2 d-flex  justify-content-around algin-items-center">
          <div className="col-lg-12 d-flex justify-content-center align-items-center">
            {loading && (
              <ClipLoader
                color="#000"
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
            {!loading && error && <p className="text-danger">{error}</p>}
          </div>
          {cartLists.map((item, index) => (
            <Card
              key={index}
              style={{ width: "22rem", marginBottom: "1rem", border: "none" }}
              className="hove mb-4"
            >
              <Card.Img variant="top" className="cd" src={item.imgdata} />
              <Card.Body style={{ paddingLeft: "0rem" }}>
                <div className="upper_data d-flex justify-content-between algin-items-center">
                  <Card.Title className="text-uppercase ">
                    {item.dish}
                  </Card.Title>
                  <p>
                    <span className="bolder px-2">
                      {item.rating} <i className="fa-solid fa-star"></i>
                    </span>
                  </p>
                </div>
                <div className="lower_data d-flex justify-content-between algin-items-center">
                  <Card.Text>{item.somedata}</Card.Text>
                  <span>{item.ogprice}</span>
                </div>
                <div className="extra"></div>
                <div className="lower_data d-flex justify-content-between algin-items-center my-2">
                  <img src={ReactImage} className="limg" alt="" />
                  <span className="mt-2">
                    {" "}
                    Price <span>{item.ogprice}</span>
                  </span>
                </div>
                <Button
                  className="mt-2 mb-2 text-center d-block"
                  style={{ width: "100%", border: "none", background: "blue" }}
                  variant="outline-light"
                  onClick={() => send(item)}
                >
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
