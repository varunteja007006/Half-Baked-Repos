import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="nav-color" variant="dark">
        <Container>
          <Navbar.Brand href="/">Django-React-Quotes</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
