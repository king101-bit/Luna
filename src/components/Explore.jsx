import { Container, Row, Col, Card, Button } from "react-bootstrap";
import myImage from "../assets/arif.jpg";

const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    category: "Web Development",
    level: "Beginner",
    duration: "8 weeks",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    category: "Programming",
    level: "Intermediate",
    duration: "6 weeks",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    category: "Data Science",
    level: "Beginner",
    duration: "10 weeks",
  },
  {
    id: 4,
    title: "Introduction to AI/ML",
    category: "Programming",
    level: "Intermediate",
    duration: "5 weeks",
  },
];

function Explore() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Our popular Courses</h1>
      <Row xs={1} md={2} lg={3} className="g-4 row-card">
        {courses.map((course) => (
          <Col key={course.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={myImage} width={100} height={150} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  <strong>Category:</strong> {course.category}
                  <br />
                  <strong>Level:</strong> {course.level}
                  <br />
                  <strong>Duration:</strong> {course.duration}
                </Card.Text>
                <Button
                  variant="primary"
                  className="mt-auto"
                  style={{ backgroundColor: "#FF6F61", borderColor: "#FF6F61" }}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default Explore;
