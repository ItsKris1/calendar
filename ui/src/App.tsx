import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  DayCellContentArg,
  DayHeaderContentArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { CSSProperties, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./redux/app";
import {
  eventCreated,
  eventDeleted,
  eventUpdated,
  fetchEvents,
  searchEventById,
} from "./redux/app/features/events.slice";

import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ModalFooter,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Alert,
} from "reactstrap";
import { EventDetailsForm } from "./EventDetailsForm";
import { Event } from "./types/event";
import { LoadingSpinner } from "./LoadingScreen/LoadingScreen";
import et from "@fullcalendar/core/locales/en-au";

function App() {
  const [fetchData, setFetchData] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [alertTxt, setAlertTxt] = useState("");
  const [alertType, setAlertType] = useState("info");

  const { loading, entities, entity } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAssets = async () => {
      try {
        await dispatch(fetchEvents()).unwrap();
        setFetchData(false);
      } catch (e) {
        displayAlert("danger", (e as Error).message);
      }
    };

    if (fetchData) getAssets();
  }, [fetchData, dispatch]);

  const onDismiss = () => setVisible(false);

  const displayAlert = (type: string, text: string) => {
    let alertMsg = `${type === "danger" ? "Error" : ""}${text}`;
    setAlertTxt(alertMsg);
    setAlertType(type);
    setVisible(true);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };
  const toggleCreateModal = () => {
    setCreateModal(!createModal);
  };

  const handleEditEvent = async (event: Event) => {
    setEditModal(false);

    try {
      await dispatch(eventUpdated({ id: entity.id, ...event })).unwrap();
      displayAlert("info", "Event updated succesfully!");
    } catch (e) {
      displayAlert("danger", (e as Error).message);
    }
  };

  const handleEventDelete = async () => {
    setEditModal(false);

    try {
      await dispatch(eventDeleted(entity.id as string)).unwrap();
      displayAlert("info", "Event deleted succesfully!");
    } catch (e) {
      displayAlert("danger", (e as Error).message);
    }
  };

  const handleNewEvent = async (event: Event) => {
    setCreateModal(false);

    try {
      await dispatch(eventCreated(event)).unwrap();
      displayAlert("info", "Event created succesfully!");
    } catch (e) {
      displayAlert("danger", (e as Error).message);
    }
  };

  const renderHeaderContent = (info: DayHeaderContentArg) => {
    const headerStyle: CSSProperties =
      info.text === "Sun" || info.text === "Sat" ? { color: "#dd4822" } : {};
    return <p style={headerStyle}>{info.text}</p>;
  };

  const renderCellContent = (info: DayCellContentArg) => {
    const day = info.date.getDay();
    const cellStyle: CSSProperties =
      day === 0 || day === 6 ? { color: "#dd4822" } : {};

    return <p style={cellStyle}>{info.dayNumberText}</p>;
  };

  return (
    <Container className="p-4">
      <Row sm="auto">
        <Col>
          <h2>Event calendar</h2>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col sm="auto">
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
        </Col>
        <Col sm="auto">
          <div className="calendar-wrapper">
            {loading && <LoadingSpinner />}
            <Alert color={alertType} isOpen={visible} toggle={onDismiss}>
              {alertTxt}
            </Alert>

            <FullCalendar
              locale={et}
              dayHeaderContent={renderHeaderContent}
              dayCellContent={renderCellContent}
              selectable
              plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
              initialView="dayGridMonth"
              themeSystem="bootstrap5"
              headerToolbar={{
                start: "createEvent",
                center: "title",
                end: "prev next",
              }}
              editable
              customButtons={{
                createEvent: {
                  text: "Create Event",
                  click: () => setCreateModal(true),
                },
              }}
              events={entities}
              eventClick={async (info: EventClickArg) => {
                console.log(info.event.id);
                await dispatch(searchEventById(Number(info.event.id)));
                setEditModal(true);
              }}
            />
          </div>
        </Col>
      </Row>

      <Modal isOpen={createModal} toggle={toggleCreateModal} centered>
        <ModalHeader className="" toggle={toggleCreateModal}>
          Create Event
        </ModalHeader>
        <ModalBody>
          <EventDetailsForm
            event={{
              title: "",
              start: "",
              type: "",
            }}
            onFormSubmit={handleNewEvent}
          />
        </ModalBody>

        <ModalFooter>
          <Button form="eventDetailsForm">Create</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editModal} toggle={toggleEditModal} centered>
        <ModalHeader toggle={toggleEditModal}>Change Event</ModalHeader>
        <ModalBody>
          <EventDetailsForm
            event={entity as Event}
            onFormSubmit={handleEditEvent}
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleEventDelete} color="danger">
            Delete
          </Button>
          <Button form="eventDetailsForm" color="primary">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default App;
