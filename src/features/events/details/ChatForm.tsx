import { push, ref, set } from "firebase/database";
import { KeyboardEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { Form, Loader } from "semantic-ui-react";
import { auth, fb } from "../../../app/config/firebase";

type Props = {
  eventId: string;
};

export default function ChatForm({ eventId }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onTouched",
  });
  async function onSubmit(data: FieldValues) {
    try {
      const chatRef = ref(fb, `chat/${eventId}`);
      const newCommentRef = push(chatRef);
      await set(newCommentRef, {
        id: newCommentRef.key,
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser?.photoURL,
        uid: auth.currentUser?.uid,
        text: data.comment,
        date: Date.now(),
      });
      reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Form>
      <Form.TextArea
        placeholder="Add your comment(Enter to submit, SHIFT + ENTER for new line)"
        {...register("comment", { required: true })}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter" && e.shiftKey) {
            return;
          }
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
        rows={2}
      />
      <Loader active={isSubmitting} />
    </Form>
  );
}
