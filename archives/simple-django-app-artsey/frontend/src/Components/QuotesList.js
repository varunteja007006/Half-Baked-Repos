import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuotesList = () => {
  const [quotes, setQuotes] = useState([]);
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = async () => {
    let data;
    axios
      .get("http://localhost:8000/wel/")
      .then((res) => {
        data = res.data;
        setQuotes(data);
      })
      .catch((err) => {});
  };
  
  const handleSubmit = async () => {
    const quotes = {name, detail} 
    fetch("http://localhost:8000/wel/", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify(quotes),
    }).then(console.log("Added data!"))
  }

  return (
    <Container>
      <Button
        className="mt-3 mb-1 add-btn"
        variant="dark"
        onClick={() => setShow(true)}
      >
        Add new Quote
      </Button>

      {quotes.map((quote, id) => (
        <Card key={id} className="mt-3 mb-1" border="dark">
          <Link to={`/quote/${quote.name}`}>
            <Card.Header className="outer-card f-700 p-2">
              Quote - {id}
            </Card.Header>
            <Card.Body className="text-black">
              <blockquote className="blockquote mb-0">
                <p>{quote.detail}</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">{quote.name}</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Link>
        </Card>
      ))}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className="border-black"
      >
        <Modal.Header closeButton className="grey-bg">
          <Modal.Title id="example-custom-modal-styling-title">
            Add Quote
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="" onSubmit={handleSubmit}>
            <Form.Control
              className="m-1 mb-2 border-black"
              type="text"
              name="name"
              id="name"
              placeholder="Author"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Control
              className="m-1 mb-2 border-black"
              as="textarea"
              rows={3}
              name="detail"
              id="detail"
              placeholder="Quote"
              onChange={(e) => setDetail(e.target.value)}
              required
            />

            <Button className="add-btn m-1" variant="dark" type="submit">
              Add Quote
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default QuotesList;
