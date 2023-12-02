import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../assets/add_icon.svg";
import "./index.scss";


const AddButton = () => {
    return (
      <>
        <Link to="/note/new">
          <Button variant="light" className="mt-0 mb-3 add-btn btn-sm">
            <AddIcon className="add-icon"></AddIcon>
          </Button>
        </Link>
      </>
    );
}
 
export default AddButton;