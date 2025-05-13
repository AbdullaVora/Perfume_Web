"use client";

import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiMinusOutline, TiPlusOutline } from 'react-icons/ti';
import { fetchCoupons } from '@/redux/slice/CollectionSlice';
import { FaTruckFast } from "react-icons/fa6";
import OrderPlacedPopup from '@/components/OrderPlaced';
import Header from '@/components/Header';
// import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { removeProductFromCart, updateProductQuantity } from '@/redux/slice/addToCartSlice';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    // const [userId, setUserId] = useState();
    const [cart, setCart] = useState([]);
    const { coupons, loading: Loading } = useSelector((state) => state.Collection);
    const { Cart, loading: CartLoading } = useSelector((state) => state.addToCart);
    const { userId } = useSelector((state) => state.userData)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchCoupons());
    }, [dispatch])

    const couponsData = coupons ? coupons.filter((coupon) => coupon.status === true) : [];

    useEffect(() => {
        // console.log(cartData)
        // const id = localStorage.getItem("userId");
        // setUserId(id)

        if (userId) {
            const filterCart = Cart.filter((data) => data.userId === userId);
            // console.log(filterCart)
            setCart(filterCart);
        } else {
            setCart(Cart);
        }
    }, [userId, Cart]);

    const handleinc = (id, quantity) => {
        dispatch(updateProductQuantity({ id: id, quantity: quantity + 1 }))
    }

    const handledic = (id, quantity) => {
        if (quantity > 1) {
            dispatch(updateProductQuantity({ id: id, quantity: quantity - 1 }))
        } else {
            dispatch(removeProductFromCart(id));
            dispatch(updateProductQuantity({ id: id, quantity: 0 }))
        }
    }

    const orderPlace = () => {
        setOrderDone(true);
        setTimeout(() => setOrderDone(false), 1000);
    }

    const handleCheckOut = () => {
        if (userId) {
            // closeSideBar();
            router.push("/checkOut")
        } else {
            // toast.error("Please Login First")
            Swal.fire({
                icon: 'error',
                text: 'Please Login After Shopping.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    const handleRemoveCart = (id) => {
        dispatch(removeProductFromCart(id))
        Swal.fire({
            icon: 'success',
            text: 'Product Removed From Cart.',
            timer: 2000,
            showConfirmButton: false
        });
    }


    // Calculate subtotal before any discounts
    const total = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

    if (Loading) {
        return (
            <div className='loader-container'>
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <>
            {/* <Header /> */}

            <div className='wishlist py-5 border-bottom'>
                <div className="container">
                    <h4 className='text-center fw-bolder display-5 mt-5 mb-5'>YOUR SHOPPING CART</h4>

                    {cart.length <= 0 ? <h2 className='fw-bold' style={{ textAlign: 'center' }}>YOUR CART IS EMPTY</h2>
                        :
                        <div className="row">
                            <div className="col-lg-8 col-md-12 mb-4">
                                <div className="border position-relative overflow-hidden" style={{ height: 'auto', boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)' }}>
                                    <div className="cartTable" >
                                        {/* Headers - Hide on mobile */}
                                        <div className="row py-2 border-bottom d-none d-md-flex" style={{ backgroundColor: '#f2f2f2', color: '#6b7280' }}>
                                            <div className="col-md-5 fw-bold ps-md-5">Product</div>
                                            <div className="col-md-2 fw-bold ps-md-4" >Price</div>
                                            <div className="col-md-2 fw-bold ps-md-2">Quantity</div>
                                            <div className="col-md-2 fw-bold ps-md-2">Subtotal</div>
                                            <div className="col-md-1 fw-bold" style={{ marginLeft: '-4%' }}>Remove</div>
                                        </div>

                                        {/* Cart items */}
                                        {cart.map((item, index) => (
                                            <div key={index} className="row align-items-center border-bottom p-3 mt-2">
                                                {/* Product image and name */}
                                                <div className="col-12 col-md-5 mb-3 mb-md-0 d-flex align-items-center">
                                                    <img src={item.product.thumbnail} alt={item.product.name} className='img-fluid' style={{ width: '100px', height: 'auto' }} />
                                                    <span className='ms-3 text-truncate' style={{ maxWidth: '200px' }}>{item.product.name}</span>
                                                </div>

                                                {/* Price - Stack on mobile */}
                                                <div className="col-6 col-md-2 mb-2 mb-md-0">
                                                    <div className="d-md-none fw-bold">Price:</div>
                                                    <span>{item.product.price}</span>
                                                </div>

                                                {/* Quantity controls - Stack on mobile */}
                                                <div className="col-6 col-md-2 mb-2 mb-md-0">
                                                    <div className="d-md-none fw-bold">Quantity:</div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="dic" onClick={() => handledic(item._id, item.quantity)}>
                                                            <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
                                                        </div>
                                                        <span className='mx-2'>{item.quantity}</span>
                                                        <div className="inc" onClick={() => handleinc(item._id, item.quantity)}>
                                                            <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Subtotal - Stack on mobile */}
                                                <div className="col-6 col-md-2 mb-2 mb-md-0">
                                                    <div className="d-md-none fw-bold">Subtotal:</div>
                                                    <span>{(item.product.price * item.quantity).toFixed(2)}</span>
                                                </div>

                                                {/* Remove button - Stack on mobile */}
                                                <div className="col-6 col-md-1 text-end d-flex align-items-center gap-2 text-md-center">
                                                    <div className="d-md-none fw-bold">Remove:</div>
                                                    <span onClick={() => handleRemoveCart(item._id)} style={{ cursor: 'pointer' }}>
                                                        <RiDeleteBin5Line size={20} />
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Order summary section */}
                            <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
                                <div className="border p-0 h-100" style={{
                                    position: 'sticky',
                                    top: '20px',
                                    maxHeight: 'calc(100vh - 40px)',
                                    overflowY: 'auto',
                                    boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)'
                                }}>
                                    <div className="cartItems border-bottom" style={{ padding: '10px 0' }}>
                                        <span style={{ fontSize: '12px', color: '#6b7280' }} className='fw-bold d-block px-3'>THERE ARE {cart.length} ITEMS IN YOUR CART</span>
                                    </div>
                                    <div className="total p-3" style={{ backgroundColor: '#f2f2f2' }}>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className='fw-bold' style={{ fontSize: '14px' }}>TOTAL:</span>
                                            <span className='fs-4 fw-bold'>{total.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-2">
                                            <span className='fw-bold mb-1 mb-md-0' style={{ fontSize: '14px' }}>SHIPPING:</span>
                                            <span className='fw-bold' style={{ fontSize: '10px', color: '#6b7280' }}>Shipping & taxes calculated at checkout</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className='fw-bold' style={{ color: 'green', fontSize: '14px' }}>Congratulations! You've got free shipping!</span>
                                            <FaTruckFast size={26} style={{ marginLeft: '10px', color: 'green' }} />
                                        </div>
                                        <span style={{ fontSize: '12px', color: '#6b7280' }}>Free shipping for any orders above <span className='fw-bold' style={{ color: 'green' }}>200.00</span></span>
                                        <span className='fw-bold d-block my-2' style={{ fontSize: '14px' }}>Add a note to your order :</span>
                                        <textarea
                                            name="note"
                                            id="note"
                                            className='border-0 p-2 fw-bold w-100'
                                            style={{ fontSize: '10px', minHeight: '100px' }}
                                            placeholder='ADD YOUR NOTE HERE'
                                        ></textarea>
                                    </div>
                                    <button onClick={handleCheckOut} className='py-3 border-0 text-white fw-bold orderbtn w-100'>CHECK OUT ORDER</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default CartPage