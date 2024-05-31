import { Card, CardGroup, Image } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "./followSlice";
import { useAppSelector } from "../../app/store/store";
import { Link } from "react-router-dom";
import ProfileConnectionsPlaceholder from "./ProfileConnectionsPlaceholder";

type Props = {
  profile: Profile;
  following: boolean;
};

export default function ProfileConnections({ profile, following }: Props) {
  const { loadCollection } = useFireStore(
    `profiles/${profile.id}/${following ? "following" : "followers"}`
  );
  const { data: followers, status } = useAppSelector((state) => state.follows);

  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  if (status === "loading") return <ProfileConnectionsPlaceholder />;

  return (
    <CardGroup itemsPerRow={4}>
      {followers.length ? (
        followers?.map((profile_) => (
          <Card key={profile_.id}>
            <Image
              src={profile_.photoURL || "/assets/user.png"}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>
                <Link to={`/profiles/${profile_.id}`}>
                  {profile_.displayName}
                </Link>
              </Card.Header>
            </Card.Content>
          </Card>
        ))
      ) : (
        <h1 style={{ marginTop: "10px", marginLeft: "10px" }}>
          {" "}
          {following ? "User is not following anyone" : "User has no followers"}
        </h1>
      )}
    </CardGroup>
  );
}
