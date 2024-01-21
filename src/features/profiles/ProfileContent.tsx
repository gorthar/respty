import { Tab } from "semantic-ui-react";
import ProfileAbout from "./ProfileAbout";
import { Profile } from "../../app/types/profile";
import ProfilePhotos from "./ProfilePhotos";
import ProfileEvents from "./ProfileEvents";
import ProfileConnections from "./ProfileConnections";

type Props = {
  profile: Profile;
};

export default function ProfileContent({ profile }: Props) {
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout profile={profile} /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <ProfileEvents profile={profile} /> },
    {
      menuItem: "Followers",
      render: () => (
        <ProfileConnections
          key={"Followers"}
          profile={profile}
          following={false}
        />
      ),
    },
    {
      menuItem: "Following",
      render: () => (
        <ProfileConnections
          key={"Following"}
          profile={profile}
          following={true}
        />
      ),
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
}
