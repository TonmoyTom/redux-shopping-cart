import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
const NavbarCustom = () => {
    return (
        <Navbar style={{ height: "60px", background: "black", color: "white" }}>
            <Container>
                <Link to="/" className="text-decoration-none text-light mx-2">
                    <h3 className="text-light">Ecommerce</h3>
                </Link>
                <Link to="/cart"  className="text-decoration-none text-light mx-2">
                    <div id='ex4'>
                        <span className='p1 fa-stack fa-2x has-badge' data-count={1}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </span>
                    </div>
                </Link>
            </Container>
        </Navbar>
    )
};

export default NavbarCustom;
