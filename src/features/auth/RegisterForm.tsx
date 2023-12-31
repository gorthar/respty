import { useForm, FieldValues } from "react-hook-form";
import ModalWrapper from "../../app/joint_graund/modals/ModalWrapper";
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/joint_graund/modals/modalSlice";
import { Button, Form } from "semantic-ui-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { toast } from "react-toastify";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { Timestamp } from "firebase/firestore";
import SocialLogin from "./SocialLogin";
import { updateName } from "./authSlice";
//import { auth } from "../../app/config/firebase";

export default function RegisterForm() {
  const { setDocument } = useFireStore("profiles");
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors, isDirty },
  } = useForm({
    mode: "onTouched",
  });
  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCreds.user, {
        displayName: data.displayName,
      });
      await setDocument(userCreds.user.uid, {
        displayName: data.displayName,
        email: data.email,
        createdAt: Timestamp.now(),
      });
      dispatch(updateName(data.displayName));
      dispatch(closeModal());
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <ModalWrapper header="Register to re-vents" size="mini">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          defaultValue=""
          type="text"
          placeholder="Name"
          {...register("displayName", {
            required: true,
          })}
          error={errors.text?.type === "required" && "Name is required"}
        />
        <Form.Input
          defaultValue=""
          type="email"
          placeholder="Email Address"
          {...register("email", {
            required: true,
            pattern: /^.+@[^.].*\.[a-z]{2,}$/,
          })}
          error={
            (errors.email?.type === "required" && "Email is required") ||
            (errors.email?.type === "pattern" && "Email is not valid")
          }
        />
        <Form.Input
          defaultValue=""
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
          error={
            (errors.password?.type === "required" && "Password is required") ||
            (errors.password?.type === "minLength" &&
              "Password must be at least 6 characters")
          }
        />
        <Button
          loading={isSubmitting}
          disabled={!isValid || isSubmitting || !isDirty}
          type="submit"
          fluid
          size="large"
          color="teal"
          content="Register"
        />

        <SocialLogin />
      </Form>
    </ModalWrapper>
  );
}
