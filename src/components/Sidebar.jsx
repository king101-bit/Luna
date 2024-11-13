import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="#about">Profile</Nav.Link>
      <Nav.Link href="#services">Settings</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
