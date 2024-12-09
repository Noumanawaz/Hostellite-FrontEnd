import React, { Component } from 'react';
import Slider from 'react-slick';
import { Hostel } from './components/hostel.js';
import axios from 'axios';
import Prices from './components/Prices.js';
import MainScreen from "./components/MainScreen.js";
import Accordian from "./components/Accordian.js";
import Footer from "./components/footer.js";
import WalkingGif from './images/Walk.gif'; // Import the walking GIF
import Stepper from './components/Stepper.js';

const containerStyle = {
    backgroundColor: "#3C6786",
    padding: "20px",
    borderRadius: "20px",
    maxWidth: "75%",
    margin: "0 auto",
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
};

const faqs = [
    { id: 1, question: "Q1: What amenities are typically available in the hostels?", answer: "Placeholder content." },
    { id: 2, question: "Q2: How do I book a room in the hostel?", answer: "Details about booking rooms." },
    { id: 3, question: "Q3: What is the check-in and check-out time?", answer: "Information about check-in/out." },
    { id: 4, question: "Q4: What is the check-in and check-out time?", answer: "Information about check-in/out." }
];

export class Home extends Component {
    state = {
        hostels: [], // Initialize as an empty array
        loading: true,
        openId: null,
        currentStep: 0
    };

    componentDidMount() {
        const limit = 5; // Fetch a limited number of hostels

        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/hostel-limit?limit=${limit}`, { timeout: 5000 }) // Reduce timeout to 5s
            .then(response => {
                // Ensure the response data is an array
                console.log(response.data);
                const hostels = Array.isArray(response.data) ? response.data : [];
                this.setState({ hostels, loading: false });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
            });
    }


    handleClick = (id) => {
        this.setState(prevState => ({
            openId: prevState.openId === id ? null : id
        }));
    };

    render() {
        const { hostels, loading, openId } = this.state;

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
            ]
        };

        if (loading) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <img src={WalkingGif} alt="Loading..." style={{ width: '50px' }} />
                </div>
            );
        }

        return (
            <div>
                <MainScreen />
                <div className="container mb-3">
                    <div className="row d-flex justify-content-center">
                        <h1 className='mt-3' style={{ color: '#3C6786' }}>Popular Hostels in ISLAMABAD</h1>
                    </div>
                    <div className="row mt-3">
                        <Slider {...settings}>
                            {hostels.map((hostel) => (
                                <div key={hostel._id} style={{ padding: '0 10px' }}>
                                    <Hostel hostel={hostel} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='container' style={{ marginTop: "20px" }}>
                    <div className="row text-start mt-4">
                        <h1 style={{ color: '#3C6786' }}>Average Hostel Prices</h1>
                        <div className="col-12 col-md-4">
                            <Prices title="Single Bed Room" />
                        </div>
                        <div className="col-12 col-md-4">
                            <Prices title="Double Bed Room" />
                        </div>
                        <div className="col-12 col-md-4">
                            <Prices title="Shared Bed Room" />
                        </div>
                    </div>
                </div>
                <Stepper />
                <div className='h2 text-center m-4' style={{ color: "#3C6786", fontWeight: "700" }}>
                    FAQ's
                </div>
                <div style={containerStyle}>
                    {faqs.map(item => (
                        <Accordian
                            key={item.id}
                            id={item.id}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openId === item.id}
                            onClick={() => this.handleClick(item.id)}
                        />
                    ))}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
