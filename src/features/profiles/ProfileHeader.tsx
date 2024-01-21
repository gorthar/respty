import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  ItemGroup,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import { Profile } from "../../app/types/profile";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../app/config/firebase";
import { batchFollow } from "./batchFallowing";
import { toast } from "react-toastify";

type Props = {
  profile: Profile;
};

export default function ProfileHeader({ profile }: Props) {
  const { currentUser } = useAppSelector((state) => state.auth);

  const [following, setFollowing] = useState<boolean>();

  useEffect(() => {
    async function getFollowing() {
      const docRef = doc(
        db,
        `profiles/${currentUser?.uid}/following/${profile.id}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    }
    if (currentUser?.uid) {
      getFollowing();
    }
  }, [currentUser?.uid, profile.id]);

  const isSelf = profile.id === currentUser?.uid;

  function createConnection() {
    try {
      batchFollow(profile, following!);
    } catch (error: any) {
      toast.error(error.message);
    }

    setFollowing(!following);
  }

  return (
    <Segment>
      <Grid>
        {/*style={{ maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}*/}
        <Grid.Column width={10}>
          <ItemGroup>
            <Item>
              <Item.Image avatar size="tiny" src={profile.photoURL} />
              <Item.Content verticalAlign="middle">
                <Header content={profile.displayName} as="h1" />
              </Item.Content>
            </Item>
          </ItemGroup>
        </Grid.Column>
        <Grid.Column width={6}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value={profile.followerCount || "0"} />
            <Statistic
              label="Following"
              value={profile.followingCount || "0"}
            />
          </Statistic.Group>

          {!isSelf && currentUser && (
            <>
              <Divider />
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button
                    fluid
                    color="teal"
                    content={following ? "Following" : "Not Following"}
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    fluid
                    basic
                    color={"purple"}
                    content={following ? "Unfollow" : "Follow"}
                    onClick={createConnection}
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
