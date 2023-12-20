import { useForm, FieldValues } from "react-hook-form";
import ModalWrapper from "../../app/joint_graund/modals/ModalWrapper";
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/joint_graund/modals/modalSlice";
import { Button, Form } from "semantic-ui-react";
import { login } from "./authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../../app/config/firebase";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors, isDirty },
  } = useForm({
    mode: "onTouched",
  });
  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    // try {
    //   const result = await signInWithEmailAndPassword(auth,data.email,data.password);
    //   console.log(result)
    // } catch (error) {
      
    // }
    // dispatch(login(data));
    // dispatch(closeModal());
  }

  return (
    <ModalWrapper header="Sign In for re-vents" size="mini">
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          content="Login"
        />
      </Form>
    </ModalWrapper>
  );
}
