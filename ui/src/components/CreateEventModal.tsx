import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { EventDetailsForm } from "./EventDetailsForm";
import { Event } from "../types/event";

type Props = {
  onCreate: (newEvent: Event) => void;
  modalOpen: boolean;
  toggleModal: () => void;
};

export const CreateEventModal = ({
  onCreate,
  modalOpen,
  toggleModal,
}: Props) => {
  const handleCreateEvent = (e: Event) => {
    toggleModal();
    onCreate(e);
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal}>Change Event</ModalHeader>
      <ModalBody>
        <EventDetailsForm
          event={{
            title: "",
            start: "",
            type: "",
          }}
          onFormSubmit={handleCreateEvent}
        />
      </ModalBody>

      <ModalFooter>
        <Button form="eventDetailsForm" color="primary">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};
