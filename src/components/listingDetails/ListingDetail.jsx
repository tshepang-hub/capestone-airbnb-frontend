import React, { useEffect, useState } from 'react';
import './ListingDetail.css';
import NavbarSearch from '../Navbar/SearchListingNav/NavbarSearch';
import { TbLeaf, TbShieldCancel } from "react-icons/tb";
import { FaKitchenSet, FaVirusCovid, FaWifi } from "react-icons/fa6";
import { TbWashMachine } from "react-icons/tb";
import { TbAirConditioning } from "react-icons/tb";
import { LuPartyPopper, LuRefrigerator } from 'react-icons/lu';
import { MdFreeCancellation, MdOutlineChildFriendly, MdOutlinePets } from 'react-icons/md';
import { PiSecurityCameraDuotone } from 'react-icons/pi';
import { IoMdBicycle } from 'react-icons/io';
import { AiOutlineFire } from 'react-icons/ai';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { BsCalendar2Date, BsHouseCheck, BsStars } from 'react-icons/bs';
import { CiClock2, CiHome } from 'react-icons/ci';
import { VscSparkle } from 'react-icons/vsc';
import { RiAlarmWarningFill, RiBankCardFill, RiDoorLockBoxLine } from 'react-icons/ri';
import { LiaSmokingBanSolid } from 'react-icons/lia';
import { GiSmokeBomb } from 'react-icons/gi';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/homeNav/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

const ListingDetail = () => {
    const cookies = new Cookies();
    const loggedInUser = cookies.get('loggedInUser')
    const dataId = useParams();
    const [houseData,setHouseData] = useState(null);
   
    const fetchData = async (id)=>{
       try{
           const data = await axios.get(`https://capstone-airbnb-backend-h39o.onrender.com/api/accommodations/${id}`);
           await setHouseData(data.data)
           console.log(houseData)
       } catch(error){
         toast.error(error.message)
       }
    }
    useEffect(()=>{
        fetchData(dataId.id)
    },[])


//    start and end date
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
// selection range to select dates inbetween startDate and endDate
    const selectionRange = {
         startDate: startDate,
         endDate: endDate,
        key: "selection",
    };

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };
// calculates nights spant
    const calculateNights = (start, end) => {
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };
    const nights = calculateNights(startDate , endDate);
  
    const reserveAcommodation = async ()=>{
        try {
            const response = await axios.post(`https://capstone-airbnb-backend-h39o.onrender.com/api/reservations`, {checkInDate:startDate,checkOutDate:endDate,accommodation:`${houseData._id}`,guests:loggedInUser.user.name,totalPrice:houseData?.price * nights - 28 + 62 + 83 + 29,createdBy:loggedInUser.user.id}, {
              headers: {
                Authorization: `Bearer ${loggedInUser?.token}`,
              },
            });
            toast.success('made reservation');
          } catch (error) {
            toast.error('reigister and login to reserve');
          }
        };
    
// reviews
    const reviews = [
        {
            name: 'Jose',
            date: 'December 2021',
            comment: 'Host was very attentive.Wonderful neighborhood, easy access to restaurants and the subway',
            image: 'https://th.bing.com/th/id/OIP.qbIF3gNiqXnB_SZI2bqsugHaFw?rs=1&pid=ImgDetMain'
        }, {
            name: 'Jose',
            date: 'December 2021',
            comment: 'Host was very attentive.Wonderful neighborhood, easy access to restaurants and the subway',
            image: 'https://th.bing.com/th/id/OIP.qbIF3gNiqXnB_SZI2bqsugHaFw?rs=1&pid=ImgDetMain'
        }, {
            name: 'Jose',
            date: 'December 2021',
            comment: 'Host was very attentive.Wonderful neighborhood, easy access to restaurants and the subway',
            image: 'https://th.bing.com/th/id/OIP.qbIF3gNiqXnB_SZI2bqsugHaFw?rs=1&pid=ImgDetMain'
        },
        {
            name: 'Shayna',
            date: 'December 2021',
            comment: 'Wonderful neighborhood, easy access to restaurants and the subway',
            image: 'https://th.bing.com/th/id/OIP.qbIF3gNiqXnB_SZI2bqsugHaFw?rs=1&pid=ImgDetMain'
        },
        {
            name: 'Luke',
            date: 'December 2021',
            comment: 'Nice place to stay!',
            image: 'https://th.bing.com/th/id/OIP.qbIF3gNiqXnB_SZI2bqsugHaFw?rs=1&pid=ImgDetMain'
        },
        {
            name: 'Josh',
            date: 'November 2021',
            comment: 'Well designed and fun space, neighborhood has lots of energy and amenities.',
            image: 'https://th.bing.com/th/id/OIP.qbIF3gNiqXnB_SZI2bqsugHaFw?rs=1&pid=ImgDetMain'
        }
    ];

    console.log(houseData)
    if (!houseData) {
        return <div>Loading...</div>; // Or a spinner/loading animation
    }

    return (
        <>
        <ToastContainer/>
            <Navbar/>
            <div className="container">
                {/* Header Section */}
                <section className="header">
                    <h1>{houseData?.name}</h1>
                    <div className="rating">
                        <span>⭐ 5.0</span>
                        <a href="#">7 reviews</a>
                        <span> · Superhost</span>
                        <a href="#"> · {houseData?.location}</a>
                    </div>
                </section>

                {/* Gallery Section */}
                <section>
                <div className="gallery">
                    <div className="main-image">
                        <img src={houseData?.images[1]} alt="Living Room" />
                    </div>
                    <div className="thumbnail-grid">
                        <img src={houseData?.images[2]} alt="Living Room 2" />
                        <img src={houseData?.images[3]} alt="Kitchen" />
                    </div>
                </div>

                <div className="show-all">
                    <button>Show all photos</button>
                </div>
                </section>
                {/* Rental Details Section */}
                <section>
                <div style={{ display: "flex" }}>
                    <div className="rental-details">
                        <h2>Entire rental unit hosted by {houseData?.host}</h2>
                        <p> {houseData?.bedrooms} bedrooms · {houseData?.beds} beds · {houseData?.bathrooms} bath</p>

                        <ul className="features">
                            <li>
                                <CiHome className='img' />
                                <div>
                                    <span>Entire home</span>
                                    <p>You’ll have the apartment to yourself</p>
                                </div>
                            </li>
                            <li>
                                <VscSparkle className='img' />
                                <div>
                                    <span>Enhanced Clean</span>
                                    <p>This Host committed to Airbnb’s 5-step enhanced cleaning process.</p>
                                </div>
                            </li>
                            <li>
                                <BsHouseCheck className='img' />
                                <div>
                                    <span>Self check-in</span>
                                    <p>Check yourself in with the keypad.</p>
                                </div>
                            </li>
                        </ul>

                        <p className="description">
                        hello
                        </p>

                        <a href="#" className="show-more">Show more ›</a>
                    </div>

                    {/* Booking Summary Section */}
                   <div className="booking-summary">
                        <div className="price-info">
                            <h3>R {houseData?.price} / night</h3>
                            <div className="rating">
                                <span>⭐ 5.0</span>
                                <a href="#">7 reviews</a>
                            </div>
                        </div>

                        <div className="booking-details">
                            <div className="date-selection">
                                <div className="checkin">
                                    <label>CHECK-IN</label>
                                    <input type="date" value={startDate.toISOString().split('T')[0]} onChange={(e) => setStartDate(new Date(e.target.value))} />
                                </div>
                                <div className="checkin">
                                    <label>CHECKOUT</label>
                                    <input type="date" value={endDate.toISOString().split('T')[0]} onChange={(e) => setEndDate(new Date(e.target.value))} />
                                </div>
                            </div>

                            <div className="guests-selection">
                                <label>GUESTS</label>
                                <select>
                                    <option value={houseData?.guests}>2 guests</option>
                                </select>
                            </div>

                            <button className="reserve-button" onClick={reserveAcommodation}>Reserve</button>

                            <div className="price-breakdown">
                                <div>
                                {houseData?.price} × {nights} nights
                                    <span>R{houseData?.price * nights}</span>
                                </div>
                                <div>
                                    Weekly discount
                                    <span>-R28</span><br />
                                </div>
                                <div>
                                    Cleaning fee
                                    <span>R62</span><br />
                                </div>
                                <div>
                                    Service fee
                                    <span>R83</span><br />
                                </div>
                                <div>
                                    Occupancy taxes and fees
                                    <span>R29</span><br />
                                </div>
                                <strong>Total<span>R{houseData?.price * nights - 28 + 62 + 83 + 29}</span></strong>
                            </div>

                        </div>
                    </div>
                
                    {/* where you will sleep */}

                </div>
                <div className="where-you-sleep">
                    <h2>Where you’ll sleep</h2>
                    <div className="sleep-details">
                        <img src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg" alt="Bedroom" />
                        <div className="sleep-info">
                            <h3>Bedroom</h3>
                            <p>{houseData?.beds} queen bed</p>
                        </div>
                    </div>
                </div>
                </section>
                {/* what this place offers */}
                <section className="place-offers">
                    <h2>What this place offers</h2>
                    <div className="offers-list">
                        <div className="offer-item">
                            <i className="icon-leaf">
                                <TbLeaf className="w-icons" />
                            </i>
                            <span>Garden view</span>
                        </div>
                        <div className="offer-item">
                            <i className="icon-wifi">
                                <FaWifi className="w-icons" />
                            </i>
                            <span>Wifi</span>
                        </div>
                        <div className="offer-item">
                            <i className="icon-washer">
                                <TbWashMachine className="w-icons" />
                            </i>
                            <span>Free washer - in building</span>
                        </div>
                        <div className="offer-item">
                            <i className="icon-air-conditioning">
                                <TbAirConditioning className="w-icons" />
                            </i>
                            <span>Central air conditioning</span>
                        </div>
                        <div className="offer-item">
                            <i className="icon-refrigerator">
                                <LuRefrigerator className="w-icons" />
                            </i>
                            <span>Refrigerator</span>
                        </div>
                        <div className="offer-item">
                            <i className="icon-kitchen">
                                <FaKitchenSet className="w-icons" />
                            </i>
                            <span>Kitchen</span>
                        </div>
                        <div className="offer-item">
                            <i className="icon-pets">
                                <MdOutlinePets className="w-icons" />
                            </i>
                            <span>Pets allowed</span>
                        </div>
                        <div className="offer-item">
                            <i className="icon-dryer">
                                <AiOutlineFire className="w-icons" />
                            </i>
                            <span>Dryer</span>
                        </div>
                        <div className="offer-item">
                            <i className="icon-camera">
                                <PiSecurityCameraDuotone className="w-icons" />
                            </i>
                            <span>Security cameras on property</span>
                        </div>
                        <div className="offer-item">
                            <i className="icon-bicycle">
                                <IoMdBicycle className="w-icons" />
                            </i>
                            <span>Bicycles</span>
                        </div>
                    </div>
                    <button className="show-all-btn">Show all 37 amenities</button>
                </section>
                {/* calendar */}
                <section className="booking-calendar">
                    <h2>{nights} nights in {houseData?.name}</h2>
                    <p>{`${startDate.toDateString()} - ${endDate.toDateString()}`}</p>
                    <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
                    <br />

                    <div className='clear-date-sect'>
                        <BsCalendar2Date />
                        <button className="clear-dates-btn">Clear dates</button>
                    </div>
                </section>

                {/* reviews */}
                <section className="reviews-section">
                    <h2>5.0 · 7 reviews</h2>
                    <div className="reviews-ratings">
                        <div className="rating-item">
                            <span>Cleanliness</span>
                            <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '100%' }}></div>
                            </div>
                            <span>5.0</span>
                        </div>
                        <div className="rating-item">
                            <span>Communication</span>
                            <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '100%' }}></div>
                            </div>
                            <span>5.0</span>
                        </div>
                        <div className="rating-item">
                            <span>Check-in</span>
                            <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '100%' }}></div>
                            </div>
                            <span>5.0</span>
                        </div>
                        <div className="rating-item">
                            <span>Accuracy</span>
                            <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '100%' }}></div>
                            </div>
                            <span>5.0</span>
                        </div>
                        <div className="rating-item">
                            <span>Location</span>
                            <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '48%' }}></div>
                            </div>
                            <span>3.9</span>
                        </div>
                        <div className="rating-item">
                            <span>Value</span>
                            <div className="rating-bar">
                                <div className="rating-fill" style={{ width: '94%' }}></div>
                            </div>
                            <span>4.7</span>
                        </div>
                    </div>
                    <div className="reviews-list">
                        <div className="layout-reviews">
                            {reviews.map((review, index) => (
                                <div className="review-item" key={index}>
                                    <img src={review.image} alt={`R{review.name}`} className="reviewer-image" />
                                    <div className="review-content">
                                        <div className="reviewer-info">
                                            <span className="reviewer-name">{review.name}</span>
                                            <span className="review-date">{review.date}</span>
                                        </div>
                                        <p className="review-comment">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="show-more-btn">Show more</button>
                    </div>
                </section>
                {/* hosted by */}
                <section className="hosted-by-section">
                    <div className="host-info">
                        <img src="https://th.bing.com/th/id/OIP.9Izv-aszItToTtEqRMSE0QHaE6?rs=1&pid=ImgDetMain" alt="Host" className="host-image" />
                        <div className="host-details">
                            <h2>Hosted by {houseData?.host}</h2>
                            <p>Joined May 2021</p>
                            <div className="host-badges">
                                <span>★ 12 Reviews</span>
                                <span>🔍 Identity verified</span>
                                <span>🏅 Superhost</span>
                            </div>
                        </div>
                    </div>
                    <div className="host-description">
                        <p><strong>{houseData?.host} is a Superhost</strong></p>
                        <br />
                        <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                        <p>Response rate: 100%</p>
                        <p>Response time: within an hour</p>
                        <button className="contact-host-btn">Contact Host</button>
                    </div>
                    {/* <p className="payment-warning">
        ⚠️ To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
      </p> */}
                </section>

                {/* things to know */}

                <section className="things-to-know-section">
                    <h2>Things to know</h2>
                    <div className="things-to-know-content">
                        <div className="house-rules">
                            <h3>House rules</h3>
                            <ul>
                                <li><CiClock2 /> <span>Check-in: After 4:00 PM</span></li>
                                <li> <CiClock2 /> <span>Checkout: 10:00 AM</span></li>
                                <li><RiDoorLockBoxLine /> <span>Self check-in with lockbox</span></li>
                                <li><MdOutlineChildFriendly /> <span>Not suitable for infants</span></li>
                                <li><LiaSmokingBanSolid /> <span>No smoking</span></li>
                                <li><MdOutlinePets /> <span>No pets</span></li>
                                <li><LuPartyPopper /> <span>No parties or events</span></li>
                            </ul>
                        </div>
                        <div className="health-safety">
                            <h3>Health & safety</h3>
                            <ul>
                                <li><BsStars /> <span>Committed to cleaning process.</span></li>
                                <li> <FaVirusCovid /> <span>Airbnb's social-distancing</span></li>
                                <li><RiAlarmWarningFill /> <span>Carbon monoxide alarm</span></li>
                                <li><GiSmokeBomb /> <span>Smoke alarm</span></li>
                                <li> <RiBankCardFill /> <span>Security Deposit - if you damage the home</span></li>
                            </ul>
                        </div>
                        <div className="cancellation-policy">
                            <h3>Cancellation policy </h3>
                            <p>Free cancel before Feb 14 <a href="#">Show more</a></p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer className="footer-list" />
        </>
    );
};

export default ListingDetail;