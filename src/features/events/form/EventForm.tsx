import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";

export default function EventForm() {
  // const isUpdate = selectedEvent !== null;
  const initialValues = {
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
  const navigate = useNavigate();
  function onSubmit() {
    // if (isUpdate) {
    //   handleUpdateEvent({ ...selectedEvent, ...values });
    //   return;
    // }
    // handleCreateEvent({
    //   ...values,
    //   id: "a",
    //   hostedBy: "Bob",
    //   attendees: [],
    //   hostPhotoURL: "",
    // });
    // setFormOpen(false);
    console.log(values);
  }

  return (
    <Segment clearing>
      <Header content={"Create new event"} />
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
        <Button type="submit" floated="right" positive content={"Submit"} />

        <Button
          type="button"
          floated="right"
          content="Cancel"
          onClick={() => navigate(-1)}
        />
      </Form>
    </Segment>
  );
}
