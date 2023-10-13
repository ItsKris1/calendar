import { ListGroup, ListGroupItem } from "reactstrap";

export const Types = () => {
  return (
    <>
      <p style={{ fontSize: "15px", letterSpacing: 0.75 }}>
        <b>TYPES</b>
      </p>
      <ListGroup flush>
        <ListGroupItem className="ps-0">
          <i
            className="bi bi-check-circle-fill me-1"
            style={{ color: "DarkOrange" }}
          ></i>{" "}
          Education project
        </ListGroupItem>
        <ListGroupItem className="ps-0">
          <i
            className="bi bi-check-circle-fill me-1"
            style={{ color: "DarkSlateGrey" }}
          ></i>{" "}
          Meeting
        </ListGroupItem>
        <ListGroupItem className="ps-0">
          <i
            className="bi bi-check-circle-fill me-1"
            style={{ color: "Hotpink" }}
          ></i>{" "}
          Training
        </ListGroupItem>
        <ListGroupItem className="ps-0">
          <i
            className="bi bi-check-circle-fill me-1"
            style={{ color: "CornflowerBlue" }}
          ></i>{" "}
          Joint event
        </ListGroupItem>
        <ListGroupItem className="ps-0">
          <i
            className="bi bi-check-circle-fill me-1"
            style={{ color: "olive" }}
          ></i>{" "}
          Class event
        </ListGroupItem>
      </ListGroup>
    </>
  );
};
