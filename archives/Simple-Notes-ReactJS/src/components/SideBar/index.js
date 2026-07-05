import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./index.scss";

const SideBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">React Notes</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default SideBar;
