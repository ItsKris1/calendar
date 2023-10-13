import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { EventDetailsForm } from "./EventDetailsForm";
import { Event } from "../types/event";

type Props = {
  event: Event;
  modalOpen: boolean;
  toggleModal: () => void;
  onDelete: () => void;
  onEdit: (e: Event) => void;
};

export const UpdateEventModal = ({
  event,
  onEdit,
  onDelete,
  modalOpen,
  toggleModal,
}: Props) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal}>Change Event</ModalHeader>
      <ModalBody>
        <EventDetailsForm event={event} onFormSubmit={onEdit} />
      </ModalBody>

      <ModalFooter>
        <Button onClick={onDelete} color="danger">
          Delete
        </Button>
        <Button form="eventDetailsForm" color="primary">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};
