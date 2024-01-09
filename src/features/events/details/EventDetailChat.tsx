import { Segment, Header, Comment } from "semantic-ui-react";
import ChatForm from "./ChatForm";
import { AppEvent, ChatComment } from "../../../app/types/events";
import { useEffect, useState } from "react";
import { onChildAdded, ref } from "firebase/database";
import { fb } from "../../../app/config/firebase";
import { formatDistance } from "date-fns";

type Props = { event: AppEvent };

export default function EventDetailChat({ event }: Props) {
  const [comments, setComments] = useState<ChatComment[]>([]);

  useEffect(() => {
    const chatRef = ref(fb, `chat/${event.id}`);
    const unsubscribe = onChildAdded(chatRef, (data) => {
      const comment = { ...data.val(), id: data.key };
      setComments((prev) => [...prev, comment]);
    });
    return () => {
      unsubscribe();
    };
  }, [event.id]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="purple"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || "/user.png"} />
              <Comment.Content>
                <Comment.Author as="a">{comment.displayName}</Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(Number(comment.date), new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
        <ChatForm eventId={event.id} />
      </Segment>
    </>
  );
}
