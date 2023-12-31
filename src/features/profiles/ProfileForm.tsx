import { FieldValues, useForm } from "react-hook-form";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { Profile } from "../../app/types/profile";
import { updateProfile } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { Button, Form } from "semantic-ui-react";
import { useAppDispatch } from "../../app/store/store";
import { updateName } from "../auth/authSlice";

type Props = {
  profile: Profile;
  setEditMode: (editMode: boolean) => void;
};

export default function ProfileForm({ profile, setEditMode }: Props) {
  const { updateDocument } = useFireStore("profiles");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      displayName: profile.displayName,
      description: profile.description || "",
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit = async (data: FieldValues) => {
    try {
      await updateDocument(profile.id, data);
      if (data.displayName !== profile.displayName) {
        await updateProfile(auth.currentUser!, {
          displayName: data.displayName,
        });
        dispatch(updateName(data.displayName));
      }
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field>
        <Form.Input
          type="text"
          placeholder="Display Name"
          {...register("displayName", {
            required: "Display name is required",
          })}
        />
        {errors.displayName && (
          <p style={{ color: "red" }}>{errors.displayName.message}</p>
        )}
      </Form.Field>
      <Form.Field>
        <Form.TextArea
          placeholder="Description"
          {...register("description")}
        ></Form.TextArea>
      </Form.Field>
      <Button
        loading={isSubmitting}
        disabled={!isDirty || !isValid || isSubmitting}
        floated="right"
        type="submit"
        content="Update profile"
        positive
      />
      <Button
        disabled={isSubmitting}
        floated="right"
        type="button"
        onClick={() => setEditMode(false)}
        content="Cancel"
      />
    </Form>
  );
}
