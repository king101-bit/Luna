import React from "react";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import WelcomeIcon from "../assets/welcome.svg";
import "../assets/home.css";

const App = () => {
  return (
    <Container fluid className="app-container">
      {/* Top Navbar */}
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        fixed="top"
        className="shadow-sm"
      >
        <Navbar.Brand href="#home" className="fw-bold">
          Luna
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="danger" className="ms-3 rounded-pill px-3">
              Sign Up
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-3 rounded-pill px-3"
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Layout with Padding to Avoid Navbar Overlap */}
      <Row className="pt-5">
        {/* Main Content */}
        <Col xs={12} md={9} lg={10} className="main-content p-4">
          <Container>
            <Row className="align-items-center">
              <Col md={8}>
                <h1 className="display-4 text-primary">Welcome to Luna</h1>
                <p className="lead text-secondary">
                  This is a sample modern homepage layout using React-Bootstrap.
                  Customize the content as per your needs.
                </p>
              </Col>
              <Col md={4} className="text-center">
                <img
                  src={WelcomeIcon}
                  className="img-fluid welcome-image"
                  alt="Welcome"
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
