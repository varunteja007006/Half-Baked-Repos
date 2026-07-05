import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.scss";

let getDate = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

let getTitle = (note) => {
  const title = note.body.split("\n")[0];
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
};

let getContent = (note) => {
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", " ");
  content = content.replaceAll(title, "");

  if (content.length > 45) {
    return content.slice(0, 45);
  } else {
    return content;
  }
};

const ListItem = ({ note }) => {
  return (
    <Col md="auto">
      <Link to={`/note/${note.id}`} className="listitems">
        <Card bg="dark" text="white" className="mb-3">
          <Card.Body>
            <h5>{getTitle(note)}</h5>
            <h6 className="mt-1 mb-0 text-muted">{getContent(note)}</h6>{" "}
            <p className="mt-1 mb-0 text-muted timestamp">
              <span>{getDate(note)}</span>
            </p>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ListItem;
