import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { AppEvent } from "../../../app/types/events";
import { addEvent, updateEvent } from "../../../app/store/eventSlice";
import { categories } from "./categories";
import { Controller, FieldValues, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EventForm() {
  const { register, handleSubmit, control, setValue } = useForm();
  let eventId = useParams().id;
  const isUpdate = eventId !== undefined;
  const event = useAppSelector((state) =>
    state.eventsConfig.events.find((e) => e.id === eventId)
  );
  const emptyValues = {
    title: "",
    category: categories[0].value,
    description: "",
    city: "",
    venue: "",
    date: "",
    id: "a",
    hostedBy: "Bob",
    attendees: [],
    hostPhotoURL: "",
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialValues = event ?? emptyValues;

  function onSubmit(data: FieldValues) {
    if (isUpdate) {
      handleUpdateEvent(
        Object.assign({}, initialValues, data, {
          date: data.date.toString(),
        })
      );
      return;
    }
    handleCreateEvent(
      Object.assign(initialValues, data, {
        id: Date.now().toString(),
        date: data.date.toISOString(),
      })
    );
    console.log(data);
  }
  function handleCreateEvent(event: AppEvent) {
    dispatch(addEvent(event));
    navigate(`/events/${event.id}`);
  }

  function handleUpdateEvent(event: AppEvent) {
    dispatch(updateEvent(event));
    navigate("/events/" + eventId);
  }

  return (
    <Segment clearing>
      <Header content={isUpdate ? "Update event" : "Create new event"} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          placeholder="Event title"
          defaultValue={event?.title || ""}
          {...register("title")}
        />

        <Controller
          name="category"
          control={control} // control prop from useForm()
          defaultValue={event?.category || categories[0].value}
          rules={{ required: true }}
          render={({ field: { onChange, value, name } }) => (
            <Form.Dropdown
              name={name}
              placeholder="Category"
              selection
              value={value}
              options={categories}
              onChange={(_, data) => onChange(data.value)}
            />
          )}
        />

        <Form.TextArea
          placeholder="Description"
          defaultValue={event?.description || ""}
          {...register("description", { required: true })}
        />

        <Form.Input
          placeholder="City"
          defaultValue={event?.city || ""}
          {...register("city", { required: true })}
        />
        <Form.Input
          placeholder="Venue"
          defaultValue={event?.venue || ""}
          {...register("venue", { required: true })}
        />
        <Form.Field>
          <Controller
            name="date"
            control={control}
            defaultValue={event && new Date(event.date)}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) =>
                  setValue("date", value, { shouldValidate: true })
                }
                placeholderText="Date"
                showTimeSelect
                timeCaption="time"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            )}
          />
        </Form.Field>
        {/* <Form.Input
          type="date"
          placeholder="Date"
          defaultValue={event?.date || ""}
          {...register("date", { required: true })}
        /> */}

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
          onClick={() =>
            isUpdate ? navigate("/events/" + eventId) : navigate("/events")
          }
        />
      </Form>
    </Segment>
  );
}
