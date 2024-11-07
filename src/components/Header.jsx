import icon from "../assets/dev.svg";
import React from "react";
import "../assets/hero.css";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "react-bootstrap";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <strong>Luna</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {" "}
              {/* Changed 'me-auto' to 'ms-auto' */}
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="vh-100 d-flex header-section" id="home">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            {/* Icon Column */}
            <div className="col-12 col-md-6 d-none d-md-flex justify-content-center">
              <img src={icon} alt="My Icon" className="sm:hidden" width="350" height="350" />
            </div>
            {/* Text Column */}
            <div className="col-12 col-md-6">
              <h1 className="display-4 fw-bold mt-3 px-3 px-md-0">
                Elevate Your <span>Development</span> Skills and Build a{" "}
                <span>
                  <Typewriter
                    words={[
                      "Brighter",
                      "Promising",
                      "Hopeful",
                      "Prosperous",
                      "Optimistic",
                      "Illustrious",
                      "Prospective",
                      "Assured",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    cursorBlinking={true}
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={3600}
                  />
                </span>
                Future.
              </h1>
              <p className="lead mt-3 px-3 px-md-0">
                We are passionate about empowering developers to solve complex
                problems. Our platform provides the resources and community
                support necessary to make a meaningful impact in the tech world.
                Join us to enhance your skills and contribute to innovative
                solutions.
              </p>
              <Button  style={{backgroundColor:"#FF6F61"}}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;