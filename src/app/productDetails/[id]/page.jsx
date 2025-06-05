
// // "use client";

// // import { RiStarSLine } from "react-icons/ri";
// // import { FaRegClock } from "react-icons/fa6";
// // import { FaShippingFast } from "react-icons/fa";
// // import Footer from "@/components/Footer";
// // import { useEffect, useState } from 'react'
// // import Header from "@/components/Header";
// // import { useParams } from "next/navigation";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchProducts } from "@/redux/slice/HomeSlice";

// // const ProductDetail = () => {
// //     const [activeTab, setActiveTab] = useState('description')
// //     const [selectedVariants, setSelectedVariants] = useState({})
// //     const { id } = useParams()
// //     const dispatch = useDispatch()

// //     useEffect(() => {
// //         dispatch(fetchProducts())
// //     }, [dispatch])

// //     const { products } = useSelector((state) => state.Home.Home);
// //     const product = products.filter(item => item._id == id)

// //     // Process variants to group by label
// //     const variantOptions = {};
// //     product[0].variants.variants.forEach(variant => {
// //         variant.data.forEach(option => {
// //             if (!variantOptions[option.label]) {
// //                 variantOptions[option.label] = new Set();
// //             }
// //             variantOptions[option.label].add(option.value);
// //         });
// //     });

// //     // Convert Sets to Arrays
// //     for (const label in variantOptions) {
// //         variantOptions[label] = Array.from(variantOptions[label]);
// //     }

// //     const handleVariantChange = (label, value) => {
// //         setSelectedVariants(prev => ({
// //             ...prev,
// //             [label]: value
// //         }));
// //     };

// //     const tabContent = {
// //         description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultri cies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
// //         delivery: "Our delivery policy ensures quick and reliable shipping. We process all orders within 24 hours and provide tracking information. Standard delivery takes 4-6 business days, while express delivery is available for urgent orders.",
// //         shipping: "Free shipping on all orders above $50. Returns accepted within 30 days of delivery. Items must be unused and in original packaging. Contact our customer service for return authorization.",
// //         custom: "Custom tab content can be tailored to your specific needs. Contact our support team for personalized solutions and special requirements."
// //     }

// //     return (
// //         <>
// //             <Header />
// //             <div className="productDetail py-5 border-bottom">
// //                 <div className="container">
// //                     <div className="row">
// //                         <div className="col-6">
// //                             <img src={product[0]?.main} alt="" className='img-fluid' />
// //                         </div>
// //                         <div className="col-6 px-5">
// //                             <div className="title">
// //                                 <h4 className='fw-bold'>{product[0]?.name}</h4>
// //                             </div>
// //                             <div className="stars d-flex align-items-center">
// //                                 {[0, 1, 2, 3, 4].map((_, index) => (
// //                                     <RiStarSLine key={index} size={20} color='#d4d4d4' />
// //                                 ))}
// //                                 <span className='fw-bold ms-3 opacity-75 pr-detail-span'>View All Ratings</span>
// //                             </div>
// //                             <div className="priceArea py-3 d-flex align-items-center">
// //                                 <span className='discount_price fw-bold opacity-50'><del>${product[0]?.price}</del></span>
// //                                 <span className='fw-bold opacity-50'>&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;</span>
// //                                 <span className='fw-bold fs-5'>${product[0]?.mrp}</span>
// //                                 <span className='discount_per mx-3 fw-bold text-white py-1 px-3 rounded-5' style={{ backgroundColor: '#ff6400', fontSize: '12px' }}>-- {product[0]?.discount}%</span>
// //                             </div>
// //                             <p className='opacity-75 fw-medium' style={{ fontSize: '13px' }}>{product[0]?.description}</p>
// //                             <div className="position-relative mb-2 rounded-5" style={{ width: '100%', height: '8px', backgroundColor: '#d4d4d4' }}>
// //                                 <div className="position-absolute top-0 start-0 rounded-5" style={{ width: '60%', height: '100%', backgroundColor: '#ff6400' }}></div>
// //                             </div>
// //                             <span className='fw-bold opacity-50' style={{ fontSize: '13px' }}>60% items are sold -- only 40% left</span>
// //                             <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>SKU: <span className='opacity-75'>{product[0]?.skuCode}</span></span>
// //                             <span className="fw-bold d-block mt-1" style={{ fontSize: '13px' }}>SLUG: <span className='opacity-75'>{product[0]?.slug}</span></span>
// //                             <span className="fw-bold d-block mt-2 mb-3" style={{ fontSize: '13px' }}>CATEGORY: <span className='opacity-75'>
// //                                 Armchair, Bathroom, Bedroom, Clocks, Flash Deals, Flower vase, Hanging Light, Home page, Kitchen, Sofa, Tables</span></span>

// //                             {/* Dynamic variant dropdowns */}
// //                             {Object.keys(variantOptions).map(label => (
// //                                 <div key={label}>
// //                                     <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>{label.toUpperCase()}:</span>
// //                                     <select
// //                                         className="w-50 border-none outline-none p-2 fw-semibold opacity-75 mb-2"
// //                                         style={{ backgroundColor: '#f1f1f1', fontSize: '12px' }}
// //                                         value={selectedVariants[label] || ''}
// //                                         onChange={(e) => handleVariantChange(label, e.target.value)}
// //                                     >
// //                                         <option value="">Select {label}</option>
// //                                         {variantOptions[label].map(value => (
// //                                             <option key={value} value={value}>
// //                                                 {value}
// //                                             </option>
// //                                         ))}
// //                                     </select>
// //                                 </div>
// //                             ))}

// //                             {
// //                                 product[0]?.additional && (
// //                                     product[0].additional.additional.map((data) => (
// //                                         <span className="fw-bold d-block mt-1" style={{ fontSize: '13px' }}>{data.title}: <span className='opacity-75'>{data.value}</span></span>
// //                                     ))
// //                                 )
// //                             }

// //                             {
// //                                 product[0]?.details && (
// //                                     product[0].details.details.map((data) => (
// //                                         <span className="fw-bold d-block mt-1" style={{ fontSize: '13px' }}>{data.title}: <span className='opacity-75'>{data.value}</span></span>
// //                                     ))
// //                                 )
// //                             }

// //                             <div className="border-bottom border-2">
// //                                 <button className='w-100 rounded-3 fw-bold detail-btn-1 px-4 py-2 mt-3'>ADD TO CART</button>
// //                                 <button className='w-100 rounded-3 fw-bold detail-btn-2 px-4 py-2 mt-3 mb-5'>BUY IT NOW</button>
// //                             </div>

// //                             <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>GUARANTED SAFE CHECKOUT: </span>
// //                             <img src="/images/payment.avif" alt="payment" className='img-fluid mt-2' />

// //                             <span className="d-flex align-items-center fw-bold opacity-75 mt-3" style={{ fontSize: '13px' }}><FaRegClock size={18} />&nbsp; Order ships within 4 to 6 days</span>
// //                             <span className="d-flex align-items-center fw-bold opacity-75 mt-2" style={{ fontSize: '13px' }}><FaShippingFast size={18} />&nbsp; Hoorray! this item is eligible for FREE shipping</span>
// //                         </div>
// //                     </div>
// //                     <div className="other-details mt-5">
// //                         <ul type="none" className="policy d-flex m-0 p-0 pb-4 position-relative border-bottom border-2">
// //                             <li
// //                                 className={`fw-bold me-5 fs-6 cursor-pointer position-relative ${activeTab === 'description' ? 'active-tab' : ''}`}
// //                                 onClick={() => setActiveTab('description')}
// //                             >
// //                                 DESCRIPTION
// //                             </li>
// //                             <li
// //                                 className={`fw-bold me-5 fs-6 cursor-pointer position-relative ${activeTab === 'delivery' ? 'active-tab' : ''}`}
// //                                 onClick={() => setActiveTab('delivery')}
// //                             >
// //                                 DELIVERY POLICY
// //                             </li>
// //                             <li
// //                                 className={`fw-bold me-5 fs-6 cursor-pointer position-relative ${activeTab === 'shipping' ? 'active-tab' : ''}`}
// //                                 onClick={() => setActiveTab('shipping')}
// //                             >
// //                                 SHIPPING & RETURN
// //                             </li>
// //                             <li
// //                                 className={`fw-bold me-5 fs-6 cursor-pointer position-relative ${activeTab === 'custom' ? 'active-tab' : ''}`}
// //                                 onClick={() => setActiveTab('custom')}
// //                             >
// //                                 CUSTOM TAB
// //                             </li>
// //                         </ul>
// //                         <p className="opacity-75 mt-4 fw-medium" style={{ fontSize: '14px' }}>
// //                             {tabContent[activeTab]}
// //                         </p>
// //                         <ul className='ps-3 p-0 gap-3 mt-4'>
// //                             <li className="fw-medium opacity-75" style={{ fontSize: '13px' }}>Ribbed and double stitched collar and armholes</li>
// //                             <li className="fw-medium opacity-75" style={{ fontSize: '13px' }}>High-density fabric for vivid print clarit</li>
// //                             <li className="fw-medium opacity-75" style={{ fontSize: '13px' }}>Machine-wash safe</li>
// //                             <li className="fw-medium opacity-75" style={{ fontSize: '13px' }}>Single right rear button flap pocket</li>
// //                             <li className="fw-medium opacity-75" style={{ fontSize: '13px' }}>Products are proudly printed in the United States</li>
// //                         </ul>
// //                     </div>
// //                 </div>
// //             </div >
// //             <Footer />
// //         </>
// //     )
// // }

// // export default ProductDetail

// "use client";

// import { RiStarSLine } from "react-icons/ri";
// import { FaRegClock } from "react-icons/fa6";
// import { FaShippingFast } from "react-icons/fa";
// import Footer from "@/components/Footer";
// import { useEffect, useState } from 'react'
// import Header from "@/components/Header";
// import { useParams, useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";


// // Import Swiper components and styles
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/thumbs';
// // import { fetchProducts } from "@/redux/slice/HomeSlice";
// // import { addProductToCart, fetchProducts } from "@/redux/slice/CollectionSlice";
// import { addProductToCart, fetchProducts } from "@/redux/slice/addToCartSlice";


// const ProductDetail = () => {
//     const [activeTab, setActiveTab] = useState('description');
//     const [selectedVariants, setSelectedVariants] = useState({});
//     // Swiper related states
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [userId, setUserId] = useState('null')

//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const router = useRouter()

//     useEffect(() => {
//         // dispatch(fetchProducts());
//         const id = localStorage.getItem('userId');
//         setUserId(id)
//     }, [dispatch]);

//     const { products, loading: Loading } = useSelector((state) => state.Home.Home);
//     const product = products.filter(item => item._id == id);
//     // console.log(Loading);
//     // Prepare images array for the swiper
//     const productImages = product.length > 0 ? [product[0].main, ...(product[0].images || [])] : [];

//     // Process variants to group by label
//     const variantOptions = {};
//     if (product.length > 0 && product[0].variants && product[0].variants.variants) {
//         product[0].variants.variants.forEach(variant => {
//             variant.data.forEach(option => {
//                 if (!variantOptions[option.label]) {
//                     variantOptions[option.label] = new Set();
//                 }
//                 variantOptions[option.label].add(option.value);
//             });
//         });
//     }

//     // Convert Sets to Arrays
//     for (const label in variantOptions) {
//         variantOptions[label] = Array.from(variantOptions[label]);
//     }

//     const handleVariantChange = (label, value) => {
//         setSelectedVariants(prev => ({
//             ...prev,
//             [label]: value
//         }));
//     };

//     const tabContent = {
//         description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultri cies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
//         delivery: "Our delivery policy ensures quick and reliable shipping. We process all orders within 24 hours and provide tracking information. Standard delivery takes 4-6 business days, while express delivery is available for urgent orders.",
//         shipping: "Free shipping on all orders above $50. Returns accepted within 30 days of delivery. Items must be unused and in original packaging. Contact our customer service for return authorization.",
//         custom: "Custom tab content can be tailored to your specific needs. Contact our support team for personalized solutions and special requirements."
//     }


//     const handleCart = () => {
//         if (!product[0]) return;

//         // Prepare selected variants array from the selectedVariants state
//         const selectedVariantArray = Object.entries(selectedVariants)
//             .filter(([_, value]) => value) // Remove empty selections
//             .map(([label, value]) => ({ label, value }));

//         dispatch(addProductToCart({
//             userId,
//             id: product[0]._id,
//             selectedVariant: selectedVariantArray.length > 0 ? selectedVariantArray : null,
//             product: product[0]

//         }));
//     }

//     const handleBuy = () => {
//         if (!product[0]) return;

//         // Prepare selected variants array from the selectedVariants state
//         const selectedVariantArray = Object.entries(selectedVariants)
//             .filter(([_, value]) => value) // Remove empty selections
//             .map(([label, value]) => ({ label, value }));

//         dispatch(addProductToCart({
//             id: product[0]._id,
//             selectedVariant: selectedVariantArray.length > 0 ? selectedVariantArray : null
//         }));
//         router.push('/checkOut');
//     }


//     if (Loading) {
//         return (
//             <div className='loader-container'>
//                 <span className="loader"></span>
//             </div>
//         );
//     }

//     return (
//         <>
//             {/* <Header /> */}
//             <div className="productDetail py-5 border-bottom">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-6 col-md-12">
//                             {/* Main Swiper for large image display */}
//                             <Swiper
//                                 spaceBetween={10}
//                                 autoplay={true}
//                                 pagination={{ clickable: true }}
//                                 thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                                 modules={[Pagination, Autoplay, Thumbs]}
//                                 className="product-main-swiper mb-3"
//                             >
//                                 {productImages.map((image, index) => (
//                                     <SwiperSlide key={index}>
//                                         <img src={image} alt={`Product image ${index}`} className="img-fluid w-100" />
//                                     </SwiperSlide>
//                                 ))}
//                             </Swiper>

//                             {/* Thumbnail Swiper */}
//                             <Swiper
//                                 onSwiper={setThumbsSwiper}
//                                 spaceBetween={10}
//                                 slidesPerView={4}
//                                 watchSlidesProgress={true}
//                                 modules={[Thumbs]}
//                                 className="product-thumbs-swiper"
//                             >
//                                 {productImages.map((image, index) => (
//                                     <SwiperSlide key={index}>
//                                         <img
//                                             src={image}
//                                             alt={`Thumbnail ${index}`}
//                                             className="img-fluid cursor-pointer"
//                                             style={{ objectFit: 'cover', height: '100%', width: '100%' }}
//                                         />
//                                     </SwiperSlide>
//                                 ))}
//                             </Swiper>
//                         </div>
//                         <div className="col-lg-6 col-md-12 px-lg-5 px-md-5 px-2">
//                             <div className="title">
//                                 <h4 className='fw-bold'>{product[0]?.name}</h4>
//                             </div>
//                             <div className="stars d-flex align-items-center">
//                                 {[0, 1, 2, 3, 4].map((_, index) => (
//                                     <RiStarSLine key={index} size={20} color='#d4d4d4' />
//                                 ))}
//                                 <span className='fw-bold ms-3 opacity-75 pr-detail-span'>View All Ratings</span>
//                             </div>
//                             <div className="priceArea py-3 d-flex align-items-center">
//                                 <span className='fw-bold fs-5 opacity-50'><del>{product[0]?.mrp}</del></span>
//                                 <span className='fw-bold opacity-50'>&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;</span>
//                                 <span className='discount_price fw-bold fs-5'>{product[0]?.price}</span>
//                                 <span className='discount_per mx-3 fw-bold text-white py-1 px-3 rounded-5' style={{ backgroundColor: '#ff6400', fontSize: '12px' }}>-- {product[0]?.discount}%</span>
//                             </div>
//                             <p className='opacity-75 fw-medium' style={{ fontSize: '16px' }}>{product[0]?.description}</p>
//                             <div className="position-relative mb-2 rounded-5" style={{ width: '100%', height: '8px', backgroundColor: '#d4d4d4' }}>
//                                 <div className="position-absolute top-0 start-0 rounded-5" style={{ width: '60%', height: '100%', backgroundColor: '#ff6400' }}></div>
//                             </div>
//                             <span className='fw-bold opacity-50' style={{ fontSize: '16px' }}>60% items are sold -- only 40% left</span>
//                             <span className="fw-bold d-block mt-4" style={{ fontSize: '16px' }}>SKU: <span className='opacity-75'>{product[0]?.skuCode}</span></span>
//                             <span className="fw-bold d-block mt-1" style={{ fontSize: '16px' }}>SLUG: <span className='opacity-75'>{product[0]?.slug}</span></span>
//                             <span className="fw-bold d-block mt-2 mb-3" style={{ fontSize: '16px' }}>CATEGORY: <span className='opacity-75'>
//                                 Armchair, Bathroom, Bedroom, Clocks, Flash Deals, Flower vase, Hanging Light, Home page, Kitchen, Sofa, Tables</span></span>

//                             {/* Dynamic variant dropdowns */}
//                             {/* {Object.keys(variantOptions).map(label => (
//                                 <div key={label}>
//                                     <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>{label.toUpperCase()}:</span>
//                                     <select
//                                         className="w-50 border-none outline-none p-2 fw-semibold opacity-75 mb-2"
//                                         style={{ backgroundColor: '#f1f1f1', fontSize: '12px' }}
//                                         value={selectedVariants[label] || ''}
//                                         onChange={(e) => handleVariantChange(label, e.target.value)}
//                                     >
//                                         <option value="">Select {label}</option>
//                                         {variantOptions[label].map(value => (
//                                             <option key={value} value={value}>
//                                                 {value}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             ))} */}
//                             <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                                 {Object.keys(variantOptions).map(label => (
//                                     <div
//                                         key={label}
//                                         style={{ width: '50%', boxSizing: 'border-box' }}
//                                         className="p-2"
//                                     >
//                                         <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>
//                                             {label.toUpperCase()}:
//                                         </span>
//                                         <select
//                                             className="border-none outline-none p-2 fw-semibold opacity-75 mb-2"
//                                             style={{ width: '100%', backgroundColor: '#f1f1f1', fontSize: '13px' }}
//                                             value={selectedVariants[label] || ''}
//                                             onChange={(e) => handleVariantChange(label, e.target.value)}
//                                         >
//                                             <option value="">Select {label}</option>
//                                             {variantOptions[label].map(value => (
//                                                 <option key={value} value={value}>
//                                                     {value}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 ))}
//                             </div>


//                             {
//                                 product[0]?.additional && (
//                                     product[0].additional.additional.map((data, index) => (
//                                         <span key={index} className="fw-bold d-block mt-1" style={{ fontSize: '15px' }}>{data.title}: <span className='opacity-75'>{data.value}</span></span>
//                                     ))
//                                 )
//                             }

//                             {
//                                 product[0]?.details && (
//                                     product[0].details.details.map((data, index) => (
//                                         <span key={index} className="fw-bold d-block mt-1" style={{ fontSize: '15px' }}>{data.title}: <span className='opacity-75'>{data.value}</span></span>
//                                     ))
//                                 )
//                             }

//                             <div className="border-bottom border-2">
//                                 <button onClick={() => handleCart(product[0]._id)} className='w-100 rounded-3 fw-bold detail-btn-1 px-4 py-2 mt-3'>ADD TO CART</button>
//                                 <button onClick={(() => handleBuy(product[0]._id))} className='w-100 rounded-3 fw-bold detail-btn-2 px-4 py-2 mt-3 mb-5'>BUY IT NOW</button>
//                             </div>

//                             <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>GUARANTED SAFE CHECKOUT: </span>
//                             <img src="/images/payment.avif" alt="payment" className='img-fluid mt-2' />

//                             <span className="d-flex align-items-center fw-bold opacity-75 mt-3" style={{ fontSize: '13px' }}><FaRegClock size={18} />&nbsp; Order ships within 4 to 6 days</span>
//                             <span className="d-flex align-items-center fw-bold opacity-75 mt-2" style={{ fontSize: '13px' }}><FaShippingFast size={18} />&nbsp; Hoorray! this item is eligible for FREE shipping</span>
//                         </div>
//                     </div>
//                     <div className="other-details mt-5">
//                         {/* Tabs Navigation - Now scrollable on mobile */}
//                         <div className="tabs-container mb-4">
//                             <ul className="nav nav-tabs d-flex flex-nowrap overflow-auto pb-2" style={{ whiteSpace: 'nowrap', scrollbarWidth: 'none' }}>
//                                 {['description', 'delivery', 'shipping', 'custom'].map((tab) => (
//                                     <li className="nav-item" key={tab}>
//                                         <button
//                                             className={`nav-link fw-bold px-3 px-md-4 py-2 mx-1 mx-md-2 ${activeTab === tab ? 'active' : ''}`}
//                                             onClick={() => setActiveTab(tab)}
//                                             style={{
//                                                 border: 'none',
//                                                 backgroundColor: 'transparent',
//                                                 color: activeTab === tab ? '#0A5D5D' : '#000',
//                                                 borderBottom: activeTab === tab ? '2px solid #0A5D5D' : 'none',
//                                                 fontSize: '14px',
//                                                 borderRadius: '0'
//                                             }}
//                                         >
//                                             {tab.toUpperCase()}
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         {/* Tab Content */}
//                         <div className="tab-content p-3 p-md-4" style={{
//                             backgroundColor: '#f9f9f9',
//                             border: '1px solid #eee',
//                             borderRadius: '4px'
//                         }}>
//                             {/* Active Tab Content */}
//                             <div className="tab-pane active">
//                                 <p className="opacity-75 fw-medium mb-3" style={{ fontSize: '14px', lineHeight: '1.6' }}>
//                                     {tabContent[activeTab]}
//                                 </p>

//                                 {/* Product Features List */}
//                                 <ul className="ps-3 mb-0" style={{ listStyleType: 'disc' }}>
//                                     <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Ribbed and double stitched collar and armholes</li>
//                                     <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>High-density fabric for vivid print clarity</li>
//                                     <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Machine-wash safe</li>
//                                     <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Single right rear button flap pocket</li>
//                                     <li className="fw-medium opacity-75" style={{ fontSize: '13px' }}>Products are proudly printed in the United States</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div >
//             {/* <Footer /> */}

//             {/* Add some basic styles for the Swiper */}
//             <style jsx global>{`
//                 .product-main-swiper {
//                     width: 100%;
//                     height: 70%;
//                     margin-bottom: 15px;
//                 }

//                 .product-main-swiper .swiper-slide {
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     background: #f8f8f8;
//                 }

//                 .product-thumbs-swiper {
//                     width: 100%;
//                     height: 120px;
//                 }

//                 .product-thumbs-swiper .swiper-slide {
//                     opacity: 0.4;
//                     cursor: pointer;
//                     border: 1px solid #ddd;
//                 }

//                 .product-thumbs-swiper .swiper-slide-thumb-active {
//                     opacity: 1;
//                     border: 1px solid #ff6400;
//                 }

//                 .cursor-pointer {
//                     cursor: pointer;
//                 }
//                      .tabs-container::-webkit-scrollbar {
//         display: none;
//     }

//     /* Responsive adjustments */
//     @media (max-width: 768px) {
//         .nav-tabs {
//             padding-bottom: 8px;
//         }

//         .nav-link {
//             padding: 8px 12px !important;
//             font-size: 13px !important;
//         }

//         .tab-content {
//             padding: 16px !important;
//         }
//     }

//     @media (max-width: 576px) {
//         .nav-link {
//             padding: 6px 10px !important;
//             margin: 0 4px !important;
//         }
//     }
//             `}</style>
//         </>

//     )
// }

// export default ProductDetail;


"use client";

import { RiStarSLine } from "react-icons/ri";
import { FaPlay, FaRegClock } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react'
import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { addProductToCart } from "@/redux/slice/addToCartSlice";
import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
import { fetchProducts } from "@/redux/slice/HomeSlice";
import Swal from "sweetalert2";

const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState('description');
    const [selectedVariants, setSelectedVariants] = useState({});
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // const [userId, setUserId] = useState('null');
    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        // const id = localStorage.getItem('userId');
        // setUserId(id);
        dispatch(fetchProducts())
    }, [dispatch]);

    const { products, loading: Loading } = useSelector((state) => state.Home.Home);
    const product = products.filter(item => item._id == id);
    const productImages = product.length > 0 ? [product[0].main, ...(product[0].images || [])] : [];
    const cartData = useSelector(state => state.addToCart.Cart);
    const { userId } = useSelector((state) => state.userData)

    // Update the productImages array to include videos
    const productMedia = product.length > 0 ? [
        ...(product[0].main ? [{ url: product[0].main, type: 'image' }] : []),
        ...(product[0].images || []).map(img => ({ url: img, type: 'image' })),
        ...(product[0].videos || []).map(vid => ({ url: vid, type: 'video' }))
    ] : [];


    // Check if product is in cart
    const isInCart = cartData.some(item =>
        item?.product?._id === id && item?.userId === userId
    );


    // console.log(product)
    // Process variants to group by label
    const variantOptions = {};
    if (product.length > 0 && product[0].variants && product[0].variants.variants) {
        product[0].variants.variants.forEach(variant => {
            variant.data.forEach(option => {
                if (!variantOptions[option.label]) {
                    variantOptions[option.label] = new Set();
                }
                variantOptions[option.label].add(option.value);
            });
        });
    }

    // Convert Sets to Arrays
    for (const label in variantOptions) {
        variantOptions[label] = Array.from(variantOptions[label]);
    }

    const handleVariantChange = (label, value) => {
        setSelectedVariants(prev => ({
            ...prev,
            [label]: value
        }));
    };

    const tabContent = {
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultri cies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
        delivery: "Our delivery policy ensures quick and reliable shipping. We process all orders within 24 hours and provide tracking information. Standard delivery takes 4-6 business days, while express delivery is available for urgent orders.",
        shipping: "Free shipping on all orders above $50. Returns accepted within 30 days of delivery. Items must be unused and in original packaging. Contact our customer service for return authorization.",
        custom: "Custom tab content can be tailored to your specific needs. Contact our support team for personalized solutions and special requirements."
    }

    const handleCart = () => {
        if (!product[0]) return;

        const selectedVariantArray = Object.entries(selectedVariants)
            .filter(([_, value]) => value)
            .map(([label, value]) => ({ label, value }));

        if (isInCart) {
            Swal.fire({
                icon: 'info',
                text: 'Product Already Added',
                timer: 2000,
                showConfirmButton: false
            })
            return;
        } else {

            dispatch(addProductToCart({
                userId,
                id: product[0]._id,
                selectedVariant: selectedVariantArray.length > 0 ? selectedVariantArray : null,
                product: product[0],
                quantity: quantity
            })).then(() => {
                Swal.fire({
                    icon: 'success',
                    text: 'Product Added Successfully',
                    timer: 2000,
                    showConfirmButton: false
                })
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    text: err.message,
                    timer: 2000,
                    showConfirmButton: false
                })
            })
        }
    }

    const handleBuy = () => {
        if (!userId) {
            Swal.fire({
                icon: 'error',
                text: 'Please Login',
                timer: 2000,
                showConfirmButton: false
            })
            return;
        }
        if (!product[0]) return;

        const selectedVariantArray = Object.entries(selectedVariants)
            .filter(([_, value]) => value)
            .map(([label, value]) => ({ label, value }));

        dispatch(addProductToCart({
            userId,
            id: product[0]._id,
            selectedVariant: selectedVariantArray.length > 0 ? selectedVariantArray : null,
            product: product[0],
            quantity: quantity
        }));
        router.push('/checkOut');
    }

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
            <div className="productDetail py-5 border-bottom">
                <div className="container">
                    <div className="row">

                        {/* <div className="col-lg-6 col-md-12">
                            <Swiper
                                spaceBetween={10}
                                autoplay={true}
                                pagination={{ clickable: true }}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[Pagination, Autoplay, Thumbs]}
                                className="product-main-swiper mb-3"
                            >
                                {productImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={image} alt={`Product image ${index}`} className="img-fluid w-100" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                watchSlidesProgress={true}
                                modules={[Thumbs]}
                                className="product-thumbs-swiper"
                            >
                                {productImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index}`}
                                            className="img-fluid cursor-pointer"
                                            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div> */}
                        <div className="col-lg-6 col-md-12">
                            {/* Main Swiper for large media display */}
                            <Swiper
                                spaceBetween={10}
                                // autoplay={true}
                                pagination={{ clickable: true }}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[Pagination, Thumbs]}
                                className="product-main-swiper mb-3"
                            >
                                {productMedia.map((media, index) => (
                                    <SwiperSlide key={index}>
                                        {media.type === 'image' ? (
                                            <img
                                                src={media.url}
                                                alt={`Product image ${index}`}
                                                className="img-fluid cursor-pointer"
                                                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                            />
                                        ) : (
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <video
                                                    autoPlay
                                                    muted
                                                    loop
                                                    cclassName="img-fluid cursor-pointer"
                                                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                                >
                                                    <source src={media.url} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                {/* <div className="absolute inset-0 flex items-center justify-center">
                                                    <FaPlay className="text-white text-4xl" />
                                                </div> */}
                                            </div>
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Thumbnail Swiper */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                watchSlidesProgress={true}
                                modules={[Thumbs]}
                                className="product-thumbs-swiper"
                            >
                                {productMedia.map((media, index) => (
                                    <SwiperSlide key={index}>
                                        {media.type === 'image' ? (
                                            <img
                                                src={media.url}
                                                alt={`Thumbnail ${index}`}
                                                className="img-fluid cursor-pointer"
                                                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                            />
                                        ) : (
                                            <div className="relative w-full flex items-center justify-center">
                                                <video className="img-fluid cursor-pointer"
                                                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}>
                                                    <source src={media.url} type="video/mp4" />
                                                </video>
                                                {/* <div className="absolute inset-0 flex items-center justify-center">
                                                    <FaPlay className="text-white text-xl" />
                                                </div> */}
                                            </div>
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="col-lg-6 col-md-12 px-lg-5 px-md-5 px-2">
                            <div className="title">
                                <h4 className='fw-bold'>{product[0]?.name}</h4>
                            </div>
                            <div className="stars d-flex align-items-center">
                                {[0, 1, 2, 3, 4].map((_, index) => (
                                    <RiStarSLine key={index} size={20} color='#d4d4d4' />
                                ))}
                                <span className='fw-bold ms-3 opacity-75 pr-detail-span'>View All Ratings</span>
                            </div>
                            <div className="priceArea py-3 d-flex align-items-center">
                                <span className='fw-bold fs-5 opacity-50'><del>{product[0]?.mrp}</del></span>
                                <span className='fw-bold opacity-50'>&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;</span>
                                <span className='discount_price fw-bold fs-5'>{product[0]?.price}</span>
                                <span className='discount_per mx-3 fw-bold text-white py-1 px-3 rounded-5' style={{ backgroundColor: '#ff6400', fontSize: '12px' }}>-- {product[0]?.discount}%</span>
                            </div>
                            <p className='opacity-75 fw-medium' style={{ fontSize: '16px' }}>{product[0]?.description}</p>
                            <div className="position-relative mb-2 rounded-5" style={{ width: '100%', height: '8px', backgroundColor: '#d4d4d4' }}>
                                <div className="position-absolute top-0 start-0 rounded-5" style={{ width: '60%', height: '100%', backgroundColor: '#ff6400' }}></div>
                            </div>
                            <span className='fw-bold opacity-50' style={{ fontSize: '16px' }}>60% items are sold -- only 40% left</span>
                            <span className="fw-bold d-block mt-4" style={{ fontSize: '16px' }}>SKU: <span className='opacity-75'>{product[0]?.skuCode}</span></span>
                            <span className="fw-bold d-block mt-1" style={{ fontSize: '16px' }}>SLUG: <span className='opacity-75'>{product[0]?.slug}</span></span>
                            <span className="fw-bold d-block mt-2 mb-3" style={{ fontSize: '16px' }}>CATEGORY: <span className='opacity-75'>
                                Armchair, Bathroom, Bedroom, Clocks, Flash Deals, Flower vase, Hanging Light, Home page, Kitchen, Sofa, Tables</span></span>

                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {Object.keys(variantOptions).map(label => (
                                    <div
                                        key={label}
                                        style={{ width: '50%', boxSizing: 'border-box' }}
                                        className="p-2"
                                    >
                                        <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>
                                            {label.toUpperCase()}:
                                        </span>
                                        <select
                                            className="border-none outline-none p-2 fw-semibold opacity-75 mb-2"
                                            style={{ width: '100%', backgroundColor: '#f1f1f1', fontSize: '13px' }}
                                            value={selectedVariants[label] || ''}
                                            onChange={(e) => handleVariantChange(label, e.target.value)}
                                        >
                                            <option value="">Select {label}</option>
                                            {variantOptions[label].map(value => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>

                            {/* Quantity Controls */}
                            <div className="quantity-controls d-flex align-items-center mb-3">
                                <span className="fw-bold me-3" style={{ fontSize: '16px' }}>Quantity:</span>
                                <div className="d-flex align-items-center border border-3 rounded-3" style={{ width: '120px' }}>
                                    <button
                                        className="border-0 bg-transparent px-3 py-1 fw-bold"
                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                        style={{ fontSize: '18px' }}
                                    >
                                        <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
                                    </button>
                                    <span className="fw-bold pt-1" style={{ fontSize: '16px' }}>{quantity}</span>
                                    <button
                                        className="border-0 bg-transparent px-3 py-1 fw-bold"
                                        onClick={() => setQuantity(prev => prev + 1)}
                                        style={{ fontSize: '18px' }}
                                    >
                                        <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
                                    </button>
                                </div>
                            </div>

                            {
                                product[0]?.additional && (
                                    product[0].additional.additional.map((data, index) => (
                                        <span key={index} className="fw-bold d-block mt-1" style={{ fontSize: '15px' }}>{data.title}: <span className='opacity-75'>{data.value}</span></span>
                                    ))
                                )
                            }

                            {
                                product[0]?.details && (
                                    product[0].details.details.map((data, index) => (
                                        <span key={index} className="fw-bold d-block mt-1" style={{ fontSize: '15px' }}>{data.title}: <span className='opacity-75'>{data.value}</span></span>
                                    ))
                                )
                            }

                            <div className="border-bottom border-2">
                                <button onClick={() => handleCart(product[0]._id)} className='w-100 rounded-3 fw-bold detail-btn-1 px-4 py-2 mt-3'>ADD TO CART</button>
                                <button onClick={(() => handleBuy(product[0]._id))} className='w-100 rounded-3 fw-bold detail-btn-2 px-4 py-2 mt-3 mb-5'>BUY IT NOW</button>
                            </div>

                            <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>GUARANTED SAFE CHECKOUT: </span>
                            <img src="/images/payment.avif" alt="payment" className='img-fluid mt-2' />

                            <span className="d-flex align-items-center fw-bold opacity-75 mt-3" style={{ fontSize: '13px' }}><FaRegClock size={18} />&nbsp; Order ships within 4 to 6 days</span>
                            <span className="d-flex align-items-center fw-bold opacity-75 mt-2" style={{ fontSize: '13px' }}><FaShippingFast size={18} />&nbsp; Hoorray! this item is eligible for FREE shipping</span>
                        </div>
                    </div>
                    <div className="other-details mt-5">
                        {/* Tabs Navigation - Now scrollable on mobile */}
                        <div className="tabs-container mb-4">
                            <ul className="nav nav-tabs d-flex flex-nowrap overflow-auto pb-2" style={{ whiteSpace: 'nowrap', scrollbarWidth: 'none' }}>
                                {['description', 'delivery', 'shipping', 'custom'].map((tab) => (
                                    <li className="nav-item" key={tab}>
                                        <button
                                            className={`nav-link fw-bold px-3 px-md-4 py-2 mx-1 mx-md-2 ${activeTab === tab ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab)}
                                            style={{
                                                border: 'none',
                                                backgroundColor: 'transparent',
                                                color: activeTab === tab ? '#0A5D5D' : '#000',
                                                borderBottom: activeTab === tab ? '2px solid #0A5D5D' : 'none',
                                                fontSize: '14px',
                                                borderRadius: '0'
                                            }}
                                        >
                                            {tab.toUpperCase()}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tab Content */}
                        <div className="tab-content p-3 p-md-4" style={{
                            backgroundColor: '#f9f9f9',
                            border: '1px solid #eee',
                            borderRadius: '4px'
                        }}>
                            {/* Active Tab Content */}
                            <div className="tab-pane active">
                                <p className="opacity-75 fw-medium mb-3" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                                    {tabContent[activeTab]}
                                </p>

                                {/* Product Features List */}
                                <ul className="ps-3 mb-0" style={{ listStyleType: 'disc' }}>
                                    <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Ribbed and double stitched collar and armholes</li>
                                    <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>High-density fabric for vivid print clarity</li>
                                    <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Machine-wash safe</li>
                                    <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Single right rear button flap pocket</li>
                                    <li className="fw-medium opacity-75" style={{ fontSize: '13px' }}>Products are proudly printed in the United States</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* <Footer /> */}

            {/* Add some basic styles for the Swiper */}
            <style jsx global>{`
                    .product-main-swiper {
                        width: 100%;
                        height: 70%;
                        margin-bottom: 15px;
                    }

                    .product-main-swiper .swiper-slide {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #f8f8f8;
                    }

                    .product-thumbs-swiper {
                        width: 100%;
                        height: 120px;
                    }

                    .product-thumbs-swiper .swiper-slide {
                        opacity: 0.4;
                        cursor: pointer;
                        border: 1px solid #ddd;
                    }

                    .product-thumbs-swiper .swiper-slide-thumb-active {
                        opacity: 1;
                        border: 1px solid #ff6400;
                    }

                    .cursor-pointer {
                        cursor: pointer;
                    }
                    
                    .tabs-container::-webkit-scrollbar {
                        display: none;
                    }
                    
                    /* Quantity Controls Styles */
                    .quantity-controls button {
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .quantity-controls button:hover {
                        background-color: #f1f1f1;
                        border-radius: 4px;
                    }
                    
                    /* Responsive adjustments */
                    @media (max-width: 768px) {
                        .nav-tabs {
                            padding-bottom: 8px;
                        }
                        
                        .nav-link {
                            padding: 8px 12px !important;
                            font-size: 13px !important;
                        }
                        
                        .tab-content {
                            padding: 16px !important;
                        }
                    }
                    
                    @media (max-width: 576px) {
                        .nav-link {
                            padding: 6px 10px !important;
                            margin: 0 4px !important;
                        }
                        
                        .quantity-controls {
                            margin-bottom: 15px !important;
                        }
                    }
                `}</style>
        </>
    )
}

export default ProductDetail;