import { useAppSelector, useAppDispatch } from "./redux/app";
import {
  eventCreated,
  eventDeleted,
  eventUpdated,
  fetchEvents,
  searchEventById,
} from "./redux/app/features/events.slice";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Row, Col, Container, Alert } from "reactstrap";
import { Event } from "./types/event";
import { LoadingSpinner } from "./components/LoadingScreen/LoadingScreen";
import { UpdateEventModal } from "./components/UpdateEventModal";
import { CreateEventModal } from "./components/CreateEventModal";
import { Types } from "./components/Types";
import { useEffect, useState } from "react";
import { MyCalendar } from "./components/Calendar";

function App() {
  const [fetchData, setFetchData] = useState(true);

  const [visible, setVisible] = useState(false);
  const [alertTxt, setAlertTxt] = useState("");
  const [alertType, setAlertType] = useState("info");

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { loading, entities, entity } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();

  const toggleCreateModal = () => {
    setCreateModalOpen(!createModalOpen);
  };
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

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

  const handleEditEvent = async (event: Event) => {
    setEditModalOpen(false);

    try {
      await dispatch(eventUpdated({ id: entity.id, ...event })).unwrap();
      displayAlert("info", "Event updated succesfully!");
    } catch (e) {
      displayAlert("danger", (e as Error).message);
    }
  };

  const handleDeleteEvent = async () => {
    setEditModalOpen(false);

    try {
      await dispatch(eventDeleted(entity.id as string)).unwrap();
      displayAlert("info", "Event deleted succesfully!");
    } catch (e) {
      displayAlert("danger", (e as Error).message);
    }
  };

  const handleEventClick = async (id: string) => {
    try {
      await dispatch(searchEventById(id)).unwrap();
      setEditModalOpen(true);
    } catch (e) {
      displayAlert("danger", (e as Error).message);
    }
  };

  const createEvent = async (event: Event) => {
    try {
      await dispatch(eventCreated(event)).unwrap();
      displayAlert("info", "Event created succesfully!");
    } catch (e) {
      displayAlert("danger", (e as Error).message);
    }
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
          <Types />
        </Col>
        <Col sm="auto">
          <Alert color={alertType} isOpen={visible} toggle={onDismiss}>
            {alertTxt}
          </Alert>
          <div className="calendar-wrapper">
            {loading && <LoadingSpinner />}
            <MyCalendar
              onCreateEventButtonClick={toggleCreateModal}
              onEventClick={handleEventClick}
              events={entities}
            />
          </div>
        </Col>
      </Row>

      <CreateEventModal
        onCreate={createEvent}
        modalOpen={createModalOpen}
        toggleModal={toggleCreateModal}
      />

      <UpdateEventModal
        onDelete={handleDeleteEvent}
        onEdit={handleEditEvent}
        event={{ ...entity }}
        modalOpen={editModalOpen}
        toggleModal={toggleEditModal}
      />
    </Container>
  );
}

export default App;
