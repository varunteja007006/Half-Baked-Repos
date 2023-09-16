import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardForm = ({ quote, author, url }) => {
  const [detail, setDetail] = useState(quote);
  const [name, setName] = useState(author);
  const navigater = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();

    const updatedQuote = { name, detail };

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify(updatedQuote),
    }).then(navigater(`/quote/${name}`, { replace: true }));
  };

  return (
    <Card bg="light-grey" border="light" className="inner-card m-2">
      <Form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="mt-2 mb-2"
      >
        <Form.Group className="p-2">
          <Form.Label className="text-black f-700">Update the Quote</Form.Label>
          <Form.Control
            as="textarea"
            name="detail"
            id="detail"
            rows={3}
            onChange={(e) => setDetail(e.target.value)}
            value={detail}
            required
            className="border-black"
          />
        </Form.Group>

        <Form.Group className="p-2">
          <Form.Control
            as="textarea"
            name="author"
            id="author"
            rows={1}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-black"
          />
        </Form.Group>

        <Button className="add-btn m-2" variant="dark" type="submit">
          Update Quote
        </Button>
      </Form>
    </Card>
  );
};

export default CardForm;
