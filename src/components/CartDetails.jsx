import "../index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

import {
  addToCart,
  removeToCart,
  removeSingleCart,
  emptyAllCarts,
} from "../redux/features/cartStore";
import { useDispatch } from "react-redux";

const CartDetails = () => {
  const stripePromise = loadStripe("your_publishable_key_here");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.allCart);
  const totalItems = Array.isArray(cartData.carts) ? cartData.carts.length : "";
  const arr = cartData.carts ?? []; // Sample items array
  const totalPrice = Array.isArray(cartData.carts)
    ? cartData.carts.reduce((sum, item) => sum + (item.price || 0), 0)
    : "";
  const incrementItems = (item) => {
    dispatch(addToCart(item));
  };
  const removeCarts = (id) => {
    console.log(id);
    dispatch(removeToCart(id));
    toast.success("Remove Item in your cart");
  };
  const decrementItems = (item) => {
    dispatch(removeSingleCart(item));
  };
  const emptyCart = () => {
    dispatch(emptyAllCarts());
    navigate("/");
    toast.success("Remove all Item in your cart");
  };

  const makePayment = async () => {
    const stripe = await stripePromise;
    const body = {
      product: carts,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(
        "http://localhost:5173/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id, 
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };
  return (
    <div className="row justify-content-center m-0">
      <div className="col-md-8 mt-5 mb-5 cartDetails">
        <div className="card">
          <div className="card-header bg-dark p-3 d-flex w-100 align-items-center">
            <h5 className="text-white m-0">Cart Calculation ({totalItems})</h5>
            {arr.length > 0 && (
              <>
                <button
                  className="btn btn-danger btn-sm ms-auto"
                  onClick={() => emptyCart()}
                >
                  <i className="fa fa-trash-alt me-2"></i> Clear Cart
                </button>
                <button type="button" className="btn btn-success btn-sm">
                  Checkout
                </button>
              </>
            )}
          </div>

          <div className="card-body p-0">
            {arr.length === 0 ? (
              <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="cart-empty text-center py-5">
                        <i className="fa fa-shopping-cart fa-2x mb-3"></i>
                        <p className="mb-0">Your cart is empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {arr.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeCarts(item.id)}
                        >
                          <i className="fa fa-trash-alt"></i>
                        </button>
                      </td>
                      <td>
                        <div className="product-img">
                          <img
                            src={item.imgdata}
                            alt={item.dish}
                            className="img-fluid"
                            width={60}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="product-name">{item.dish}</div>
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary me-1"
                            onClick={
                              item.qnty == 1
                                ? () => removeCarts(item.id)
                                : () => decrementItems(item)
                            }
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            name="qty"
                            className="form-control form-control-sm text-center"
                            value={item.qnty}
                            disabled
                            style={{ width: "50px" }}
                          />
                          <button
                            className="btn btn-sm btn-outline-secondary ms-1"
                            onClick={() => incrementItems(item)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="text-end">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th colSpan={3}>
                      Items in cart <span className="ms-2 me-2">:</span>
                      <span className="text-danger">{totalItems}</span>
                    </th>
                    <th className="text-end" colSpan={2}>
                      Total Price <span className="ms-2 me-2">:</span>
                      <span className="text-danger">{totalPrice}</span>
                    </th>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
