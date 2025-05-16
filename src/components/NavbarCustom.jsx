import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

const NavbarCustom = () => {
  const cartData = useSelector((state) => state.allCart);
  const totalItems = Array.isArray(cartData.carts) ? cartData.carts.length : '';
  return (
    <Navbar style={{ height: "60px", background: "black", color: "white" }}>
      <Container>
        <Link to="/" className="text-decoration-none text-light mx-2">
          <h3 className="text-light">Ecommerce</h3>
        </Link>
        <Link to={totalItems !== 0 ? 'cart-details' : '#'} className="text-decoration-none text-light mx-2">
          <div id="ex4">
            <span
              className="p1 fa-stack fa-2x has-badge"
              data-count={totalItems}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </span>
          </div>
        </Link>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;
