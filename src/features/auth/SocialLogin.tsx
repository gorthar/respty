import { useState } from "react";
import { Button, Divider, Icon } from "semantic-ui-react";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../app/config/firebase";
import { Timestamp } from "firebase/firestore";
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/joint_graund/modals/modalSlice";

export default function SocialLogin() {
  const [loading, setLoading] = useState(false);
  const { setDocument } = useFireStore("profiles");
  const dispatch = useAppDispatch();
  async function handleSocialLogin() {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime
      ) {
        await setDocument(result.user.uid, {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          createdAt: Timestamp.now(),
        });
      }
      dispatch(closeModal());
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Divider horizontal>Or</Divider>
      <Button
        type="button"
        fluid
        loading={loading}
        color="google plus"
        style={{ marginBottom: 10 }}
        onClick={handleSocialLogin}
      >
        <Icon name="google" /> Login with Google
      </Button>
    </>
  );
}
