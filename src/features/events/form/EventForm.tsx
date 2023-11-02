import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownProps,
  Form,
  Header,
  Segment,
} from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { AppEvent } from "../../../app/types/events";
import { addEvent, updateEvent } from "../../../app/store/eventSlice";

export default function EventForm() {
  const eventId = useParams().id;
  const isUpdate = eventId !== undefined;
  console.log(eventId);
  console.log(isUpdate);
  const event = useAppSelector((state) =>
    state.eventsConfig.events.find((e) => e.id === eventId)
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialValues = event ?? {
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

  const categiries = [
    {
      key: "drinks",
      text: "Drinks",
      value: "drinks",
    },
    {
      key: "culture",
      text: "Culture",
      value: "culture",
    },
    {
      key: "film",
      text: "Film",
      value: "film",
    },
    {
      key: "food",
      text: "Food",
      value: "food",
    },
    {
      key: "music",
      text: "Music",
      value: "music",
    },
    {
      key: "travel",
      text: "Travel",
      value: "travel",
    },
  ];

  const [values, setValues] = useState(initialValues);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const handleDropdownChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const { name, value } = data;
    setValues({ ...values, [name]: value });
  };

  function onSubmit() {
    if (isUpdate) {
      dispatch(updateEvent(values));
      navigate(-1);
      return;
    }
    handleCreateEvent({
      ...values,
      id: Math.random().toString(),
      hostedBy: "Jim",
      attendees: [],
      hostPhotoURL: "/user.png",
    });
    // setFormOpen(false);
    console.log(values);
  }
  function handleCreateEvent(event: AppEvent) {
    dispatch(addEvent(event));
    navigate(`/events/${event.id}`);
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
          <Dropdown
            placeholder="Category"
            selection
            options={categiries}
            value={values.category}
            name="category"
            onChange={(props, data) => handleDropdownChange(props, data)}
          />
          {/* <input
            type="text"
            placeholder="Category"
            name="category"
            value={values.category}
            onChange={handleInputChange}
          /> */}
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
            onChange={(e) => handleInputChange(e)}
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
