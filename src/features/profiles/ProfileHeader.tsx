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
import { useParams } from "react-router-dom";
import { Profile } from "../../app/types/profile";

type Props = {
  profile: Profile;
};

export default function ProfileHeader({ profile }: Props) {
  const fallowing = true;
  const { currentUser } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const isSelf = id === currentUser?.uid;

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
            <Statistic label="Followers" value="5" />
            <Statistic label="Following" value="42" />
          </Statistic.Group>

          {!isSelf && (
            <>
              <Divider />
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button fluid color="teal" content="Following" />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    fluid
                    basic
                    color={"purple"}
                    content={fallowing ? "Unfollow" : "Follow"}
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
