import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../../app/store/store";
import { AppEvent } from "../../../app/types/events";

import { categories } from "./categories";
import { Controller, FieldValues, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Timestamp,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../app/config/firebase";

export default function EventForm() {
  const { register, handleSubmit, control, setValue } = useForm();
  const eventId = useParams().id;
  const isUpdate = eventId !== undefined;
  const event = useAppSelector((state) =>
    state.eventsConfig.events.find((e) => e.id === eventId)
  );

  const navigate = useNavigate();

  //const initialValues = event ?? emptyValues;

  async function updateEventDb(data: AppEvent) {
    if (!event) return;
    const eventRef = doc(db, "events", data.id);
    console.log(data.id);
    await updateDoc(eventRef, {
      ...data,
      date: Timestamp.fromDate(new Date(data.date)),
    });
  }

  async function createEventDb(data: FieldValues) {
    const newEventRef = doc(collection(db, "events"));
    await setDoc(newEventRef, {
      ...data,
      hostedBy: "Bob",
      attendees: [],
      hostPhotoURL: "",
      date: Timestamp.fromDate(new Date(data.date)),
    });
    return newEventRef;
  }

  async function onSubmit(data: FieldValues) {
    try {
      if (event) {
        await updateEventDb({ ...event, ...data });
        navigate("/events/" + eventId);
      } else {
        const newEventRef = await createEventDb(data);

        navigate("/events/" + newEventRef.id);
      }
    } catch (error) {
      console.log(error);
    }
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
