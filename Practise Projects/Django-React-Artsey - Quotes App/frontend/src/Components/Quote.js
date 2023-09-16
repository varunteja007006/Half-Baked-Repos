import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "./CardForm";

const Quote = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState([]);

  useEffect(() => {
    getQuote();
  }, [name]);

  let url = `http://localhost:8000/wel/quote/${name}`;

  const getQuote = async () => {
    let data;
    axios
      .get(`http://localhost:8000/wel/quote/${name}`)
      .then((res) => {
        data = res.data;
        setQuote(data);
      })
      .catch((err) => {});
  };

  let handleDeleteQuote = () => {
    fetch(`http://localhost:8000/wel/quote/${name}`, { method: "DELETE" }).then(
      () => {
        navigate(-1);
        console.log("Deleted!");
      }
    );
  };

  return (
    <Container>
      <div>
        <Button onClick={handleDeleteQuote} className="del-btn mt-3">
          <span class="del-icon material-symbols-outlined">delete</span>
        </Button>{" "}

        {quote.map((quotation, id) => (
          <Card key={id} className="outer-card mt-3" border="">
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p className="f-700">{quotation.detail}</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title" className="f-700">
                    {" "}
                    {quotation.name}{" "}
                  </cite>
                </footer>
              </blockquote>
            </Card.Body>
            <CardForm
              quote={quotation.detail}
              author={quotation.name}
              url={url}
            ></CardForm>
          </Card>
        ))}

      </div>
    </Container>
  );
};

export default Quote;
