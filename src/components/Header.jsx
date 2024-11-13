import "../assets/hero.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <section className="main">
        <div className="container-fluid d-flex justify-content-center align-items-center text-white w-100">
          <div className="col-12 col-md-6 text-center">
            <h1
              className="display-4 fw-bold mt-3"
              style={{
                letterSpacing: "1px",
                lineHeight: "1.2",
                color: "#FFFFFF",
              }}
            >
              Elevate Your Development Skills and Build an{" "}
              <span style={{ color: "#FF6F61" }}>Illustrious</span> Career
            </h1>
            <p className="lead mt-3 px-3 px-md-0">
              We are passionate about empowering developers to solve complex
              problems. Join us to enhance your skills and contribute to
              innovative solutions.
            </p>
            <Button
              onClick={goToHome}
              style={{
                backgroundColor: "#FF6F61",
                border: "none",
                padding: "10px 20px",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#FF5A4C")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#FF6F61")
              }
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
