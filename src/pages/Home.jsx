import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Items from '../data/CartData';
import ReactImage from '../assets/react.svg';
import { useState } from 'react';

const Home = () => {
    const [cartItems, setCartItems] = useState(Items)
    return (
        <>
            <section className='item_section mt-4 container'>
                <h3 className='px-4' style={{ fontWeight: 400 }}>Restaurant is open now</h3>
                <div className='row mt-2 mb-2 d-flex  justify-content-around algin-items-center'>
                    {
                        cartItems.map((item, index) => (
                            <Card key={index} style={{ width: '22rem', marginBottom: '1rem', border: 'none' }} className='hove mb-4'>
                                <Card.Img variant="top" className='cd' src={item.imgdata} />
                                <Card.Body style={{ paddingLeft: '0rem' }}>
                                    <div className='upper_data d-flex justify-content-between algin-items-center'>
                                        <Card.Title className='text-uppercase '>{item.dish}</Card.Title>
                                        <p> <span className='bolder px-2'>3.8 <i class="fa-solid fa-star"></i></span>  </p>
                                    </div>
                                    <div className='lower_data d-flex justify-content-between algin-items-center'>
                                        <Card.Text  >
                                            {item.somedata}
                                        </Card.Text>
                                        <span>300</span>
                                    </div>
                                    <div className='extra'></div>
                                    <div className='lower_data d-flex justify-content-between algin-items-center my-2'>
                                        <img src={ReactImage} className='limg' alt=''/>
                                        <span className='mt-2'> Price <span>300</span></span>
                                    </div>
                                    <Button className='mt-2 mb-2 text-center d-block' style={{width:"100%",border : 'none', background : 'blue' }} variant="outline-light">Add to cart</Button>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>

            </section>
        </>
    )
}

export default Home;