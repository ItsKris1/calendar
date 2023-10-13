import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Event } from "../types/event";

type Props = {
  event: Event;
  onFormSubmit: (event: Event) => void;
};

export const EventDetailsForm = ({ event, onFormSubmit }: Props) => {
  const [title, setTitle] = useState(event.title);
  const [start, setStart] = useState(event.start);
  const [type, setType] = useState(event.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let eventColor = "";

    switch (type) {
      case "training":
        eventColor = "Hotpink";
        break;
      case "education_project":
        eventColor = "DarkOrange";
        break;
      case "meeting":
        eventColor = "DarkSlateGrey";
        break;
      case "joint_event":
        eventColor = "CornflowerBlue";
        break;
      case "class_event":
        eventColor = "Olive";
        break;
    }
    onFormSubmit({
      title,
      start,
      type,
      backgroundColor: eventColor,
      borderColor: eventColor,
    });
  };

  return (
    <Form onSubmit={handleSubmit} id="eventDetailsForm">
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="date">Date</Label>
        <Input
          type="date"
          id="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        ></Input>
      </FormGroup>

      <FormGroup>
        <Label for="exampleSelect">Type</Label>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          value={type}
          onChange={(v) => setType(v.target.value)}
        >
          <option value="" disabled selected>
            Select type
          </option>
          <option value="meeting">Meeting</option>
          <option value="training">Training</option>
          <option value="joint_event">Joint event</option>
          <option value="class_event">Class event</option>
        </Input>
      </FormGroup>
    </Form>
  );
};
