import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas } from 'bootstrap';

function Header() {
    const linkStyle = {
        fontSize: '1.6rem',
        fontWeight: '500',
    };

    const offcanvasRef = useRef(null);

    const handleLinkClick = () => {
        const offcanvasElement = offcanvasRef.current;
        const bsOffcanvas = Offcanvas.getInstance(offcanvasElement);

        // Ensure off-canvas is closed properly when a link is clicked
        if (bsOffcanvas) {
            bsOffcanvas.hide(); // Close the off-canvas
        }

        // Manually remove any lingering backdrop after off-canvas closes
        document.body.classList.remove('offcanvas-backdrop', 'show');
    };

    useEffect(() => {
        // Initialize the Bootstrap off-canvas component manually
        const offcanvasElement = offcanvasRef.current;
        if (offcanvasElement) {

            // Ensure that backdrop is properly removed when off-canvas is closed
            offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                document.body.classList.remove('offcanvas-backdrop', 'show'); // Remove any lingering backdrop classes
            });
        }
    }, []);

    return (
        <>
            <nav
                className="navbar navbar-expand-lg"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <div className="container-fluid">
                    <a
                        className="navbar-brand mainHeading"
                        href="/"
                        style={{
                            fontSize: '2.3rem',
                            fontWeight: '700',
                        }}
                    >
                        HOSTELITE
                    </a>
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                            <li className="nav-item">
                                <Link
                                    className="nav-link mx-3 subHeading"
                                    aria-current="page"
                                    to="/"
                                    style={linkStyle}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link mx-3 subHeading"
                                    to="/hostels"
                                    style={linkStyle}
                                >
                                    Find Hostels
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link mx-3 subHeading"
                                    to="/about"
                                    style={linkStyle}
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Offcanvas menu for small screens */}
            <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                ref={offcanvasRef} // Reference the off-canvas element
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav flex-column">
                        <li className="nav-item mb-2">
                            <Link
                                className="nav-link"
                                aria-current="page"
                                to="/"
                                style={linkStyle}
                                onClick={handleLinkClick} // Close off-canvas on link click
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link
                                className="nav-link"
                                to="/hostels"
                                style={linkStyle}
                                onClick={handleLinkClick} // Close off-canvas on link click
                            >
                                Find Hostels
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link
                                className="nav-link"
                                to="/about"
                                style={linkStyle}
                                onClick={handleLinkClick} // Close off-canvas on link click
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Header;
