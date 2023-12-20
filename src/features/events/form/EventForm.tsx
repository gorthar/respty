import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../../app/store/store";

import { categories } from "./categories";
import { Controller, FieldValues, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "../../../app/store/eventSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

export default function EventForm() {
  const {loadDocument,createDocument,updateDocument} = useFireStore('events')
  const { register, handleSubmit, control, setValue, formState:{isSubmitting} } = useForm({
    mode:"onTouched",
    defaultValues:async () => {
      if (event) {
        return {
          ...event, date: new Date(event.date)
        }
      }
    }
  });
  const eventId = useParams().id;
  const isUpdate = eventId !== undefined;
  const event = useAppSelector((state) =>
    state.eventsConfig.data.find((e) => e.id === eventId)
  );
  const {status} = useAppSelector( state => state.eventsConfig);

  const navigate = useNavigate();

  useEffect(()=>{
    if (!eventId) return;
    loadDocument(eventId,actions)
  },[eventId])
  

  async function onSubmit(data: FieldValues) {
    try {
      if (event) {
        await updateDocument({ ...event, ...data })
        navigate("/events/"+event.id)
        
      } else {
        const newEventRef = await createDocument(data) 
        navigate("/events/" + newEventRef?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function cancelEvent( ){
    if (event?.isCanceled) {
      updateDocument({ ...event, isCanceled: false})
    } else {
      updateDocument({ ...event, isCanceled: true})
      
    }
    toast.success(`Event status changed to  ${event?.isCanceled?'active':'cancelled'}`)
    navigate("/events/" + eventId)
  }
  if (status === 'loading') {
    return <LoadingComponent/>
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
        {isUpdate && <Button
          type="button"
          floated="left"
          color={event?.isCanceled?'green':"red"}
          content={ event?.isCanceled ? "Reactivate Event" :"Cancel Event"}
          onClick={cancelEvent}
        />}
        

        <Button
          type="submit"
          floated="right"
          positive
          loading={isSubmitting}
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
