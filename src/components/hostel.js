import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export class Hostel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSmallScreen: window.innerWidth <= 768 // Check if screen width is small (<=768px)
        };
    }

    truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ isSmallScreen: window.innerWidth <= 768 });
    };

    render() {
        const { name, location, images } = this.props.hostel;
        const cardLink = `/hostel/${name}`;
        const { isSmallScreen } = this.state;
        const imageUrl = images[0];

        // Card content with flexbox ensuring alignment
        const cardContent = (
            <div
                className="card mx-auto mb-3 hostel-card"
                style={{
                    width: '20rem',
                    borderRadius: '32px',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <img
                    src={imageUrl}
                    alt={name}
                    className="card-img-top hostel-image"
                    style={{
                        width: '100%',
                        height: '16rem',
                        objectFit: 'cover'
                    }}
                />
                <div
                    className="card-body d-flex flex-column justify-content-between align-items-center"
                    style={{
                        padding: '1rem',
                        textAlign: 'center',
                        flex: '1'
                    }}
                >
                    <div style={{ flexGrow: '1' }}> {/* Ensures the button is pushed down */}
                        <h5
                            className="card-title text-start"
                            style={{
                                marginBottom: '0.5rem',
                                fontSize: '1.25rem',
                                color: '#3C6786'
                            }}
                        >
                            {this.truncateText(name, 18)}
                        </h5>
                        <p
                            className="text-start"
                            style={{
                                marginBottom: '1rem',
                                color: '#3C6786'
                            }}
                        >
                            <strong>Address:</strong> {this.truncateText(location, 40)}
                        </p>
                    </div>

                    {!isSmallScreen && (
                        <Link
                            to={cardLink}
                            className="btn btn-primary btn-hide-on-small"
                            style={{
                                backgroundColor: '#3C6786',
                                border: 'none',
                                borderRadius: '32px',
                                padding: '0.5rem 1rem',
                                color: '#fff',
                                fontSize: '1rem',
                                textDecoration: 'none',
                                transition: 'background-color 0.3s ease, transform 0.3s ease',
                                marginTop: 'auto', // Ensure button is pushed to the bottom
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#345a6f';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#3C6786';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            View Hostel
                        </Link>
                    )}
                </div>
            </div>
        );

        // Small screen handling
        return isSmallScreen ? (
            <Link to={cardLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                {cardContent}
            </Link>
        ) : (
            cardContent
        );
    }
}

export default Hostel;
