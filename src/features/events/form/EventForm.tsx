import { ChangeEvent, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/events";

type Props = {
  setFormOpen: (value: boolean) => void;
  handleCreateEvent: (event: AppEvent) => void;
  selectedEvent: AppEvent | null;
  handleUpdateEvent: (event: AppEvent) => void;
  handleDelteEvent: (event: AppEvent) => void;
};

export default function EventForm({
  setFormOpen,
  handleCreateEvent,
  selectedEvent,
  handleUpdateEvent,
  handleDelteEvent,
}: Props) {
  const isUpdate = selectedEvent !== null;
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
    id: "a",
    hostedBy: "Bob",
    attendees: [],
    hostPhotoURL: "",
  };
  const [values, setValues] = useState(initialValues);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  function onSubmit() {
    if (isUpdate) {
      handleUpdateEvent({ ...selectedEvent, ...values });
      return;
    }
    handleCreateEvent({
      ...values,
      id: "a",
      hostedBy: "Bob",
      attendees: [],
      hostPhotoURL: "",
    });
    setFormOpen(false);
  }

  return (
    <Segment clearing>
      <Header content={isUpdate ? "Update event" : "Create new event"} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event title"
            value={values.title}
            name="title"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={values.category}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            name="venue"
            value={values.venue}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={values.date}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button
          type="submit"
          floated="right"
          positive
          content={isUpdate ? "Update" : "Submit"}
        />
        {isUpdate && (
          <Button
            type="button"
            floated="right"
            content="Delete"
            color="red"
            onClick={() => handleDelteEvent(values)}
          />
        )}
        <Button
          type="button"
          floated="right"
          content="Cancel"
          onClick={() => setFormOpen(false)}
        />
      </Form>
    </Segment>
  );
}
