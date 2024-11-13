import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default function Component() {
  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, TechCorp",
      content:
        "This site helped me land my job 6 months after enrolling in their courses. Highly recommended!",
      rating: 5,
      image:
        "https://i.pinimg.com/236x/32/31/0d/32310da376cfa3e893da62e09b600668.jpg",
    },
    {
      name: "Jane Smith",
      role: "Designer, CreativeCo",
      content:
        "The user interface is intuitive and the features are exactly what I needed.",
      rating: 4,
      image:
        "https://i.pinimg.com/236x/32/31/0d/32310da376cfa3e893da62e09b600668.jpg",
    },
    {
      name: "Mike Johnson",
      role: "Front-end Developer, WebSolutions",
      content:
        "Outstanding support team and an active community keeps it at the top of its class.",
      rating: 4,
      image:
        "https://i.pinimg.com/236x/32/31/0d/32310da376cfa3e893da62e09b600668.jpg",
    },
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 text-4xl font-bold">
        What Our Students Say
      </h2>
      <Carousel fade indicators={false} className="testimonial-carousel">
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              <Col md={8} lg={6} className="text-center">
                <div className="testimonial-item p-4 bg-white rounded-lg shadow-lg">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-circle mx-auto mb-4 testimonial-image"
                    width={100}
                    height={100}
                  />
                  <p className="mb-4 text-lg">{testimonial.content}</p>
                  <h5 className="font-bold mb-1">{testimonial.name}</h5>
                  <p className="text-muted mb-3">{testimonial.role}</p>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-warning">
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
