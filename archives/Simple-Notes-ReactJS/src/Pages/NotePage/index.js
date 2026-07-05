import { Link, useNavigate, useParams } from "react-router-dom";
//import notes from "../../assets/data";
import { ReactComponent as ArrowLeft } from "../../assets/arrow_left.svg";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./index.scss";

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let [note, setNote] = useState([]);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if(id === "new") return
    let response = await fetch(`http://localhost:8000/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).then(navigate("/", { replace: true }));
  };

  let handleSubmit = () => {
    if (id !== "new" && !note.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if(id === "new" && note !== null) {
      createNote();
    }
    navigate("/", { replace: true });
  };

  return (
    <Container>
      <div className="icons">
        <Link to="/">
          <Button variant="light" className="m-1 arrow-btn">
            <ArrowLeft
              onClick={handleSubmit}
            ></ArrowLeft>
          </Button>
        </Link>
        {id !== "new" ? (
          <div className="delete-btn">
            <Button
              className="delete-icon btn-lg"
              onClick={deleteNote}
              variant="warning"
            >
              Delete
            </Button>
          </div>
        ) : (
          <div className="delete-btn">
            <Button
              className="delete-icon btn-lg"
              onClick={handleSubmit}
              variant="warning"
            >
              Done
            </Button>
          </div>
        )}
      </div>
      <Card className="m-2 p-1" bg="dark">
        <Form.Control
          as="textarea"
          onChange={(e) => {
            setNote({ ...note, body: e.target.value });
          }}
          rows={15}
          value={note.body}
        />
      </Card>
    </Container>
  );
};

export default NotePage;
