import { useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { RiStarSmileLine } from 'react-icons/ri'

const FlahCard = ({ id, img, title, price }) => {
    const router = useRouter()

    const handleDetail = (id) => {
        // router.push(`/productDetails/${id}`);
    }
    return (
        <>
            <div
                className="flashCard position-relative overflow-hidden px-2"
                data-aos="zoom-in" data-aos-delay="150" style={{ width: '300px' }}
                onClick={() => handleDetail(id)}
            >
                <div className="img w-100">
                    <img
                        src={img}
                        width={700}
                        alt="Flash-Card-img"
                        className="img-fluid"
                    />
                </div>
                <div className="content mt-3 text-center">
                    <h6 className="fw-normal">{title}</h6>
                    <span>${price}.00</span>
                </div>
                {/* <button className="bg-transparent rounded-1 mx-auto w-100 py-2 mb-3 mt-2">
                    Quick Add
                </button> */}
                <div className="sideIcons">
                    <div className="cart">
                        <HiOutlineShoppingCart size={14} />
                    </div>
                    <div className="star">
                        <RiStarSmileLine size={17} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlahCard
