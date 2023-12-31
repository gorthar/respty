import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "./profileSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { status, data } = useAppSelector((state) => state.profiles);
  const profile = data.find((p) => p.id === id);
  const { loadDocument } = useFireStore("profiles");

  useEffect(() => {
    if (id) loadDocument(id, actions);
  }, [id, loadDocument]);

  if (status === "loading") return <LoadingComponent content="Loading page" />;
  if (!profile) {
    return (
      <p style={{ textAlign: "center", fontSize: "20px", paddingTop: "30vh" }}>
        Error! User not found
      </p>
    );
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </Grid.Column>
    </Grid>
  );
}
