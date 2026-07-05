import { useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
//import notes from "../../assets/data";
import ListItem from "../../components/ListItem";
import AddButton from "../../components/AddButton";

const NotesList = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("http://localhost:8000/notes/");
    let data = await response.json();
    setNotes(data);
  };

  return (
    <Container>
      <h1 className="page-header">
        Notes - <Badge bg="dark">{notes.length}</Badge>
      </h1>{" "}
      <Row>
          {notes.map((note, id) => (
            <ListItem key={id} note={note} />
          ))}
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          {" "}
          <AddButton></AddButton>
        </Col>
      </Row>
    </Container>
  );
};

export default NotesList;
