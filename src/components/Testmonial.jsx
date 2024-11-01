import { Card,Row,Col,Container } from "react-bootstrap"

function Testmonial() {
    return(
        <Container className="py-5">
      <h1 className="text-center mb-5">Testmonial</h1>
      <Row xs={1} md={2} lg={3} className="g-4 row-card">
          <Col>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title><strong>Mr. Cardmakurry Zehn</strong></Card.Title>
                 <Card.Subtitle>Now works at 8-11 agency</Card.Subtitle>
                <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae impedit eveniet iste assumenda non, totam blanditiis modi quae atque aliquid maxime tempora cupiditate veritatis eos vel, magni fugiat quibusdam unde.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title><strong>Mr. Cardmakurry Zehn</strong></Card.Title>
                 <Card.Subtitle>Now works at 8-11 agency</Card.Subtitle>
                <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae impedit eveniet iste assumenda non, totam blanditiis modi quae atque aliquid maxime tempora cupiditate veritatis eos vel, magni fugiat quibusdam unde.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
      </Row>
    </Container>
    );
}

export default Testmonial;