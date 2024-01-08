import { Tab } from "semantic-ui-react";

import ProfileEventItems from "./ProfileEventItems";
import { Profile } from "../../app/types/profile";
type Props = {
  profile: Profile;
};

export default function ProfileEvents({ profile }: Props) {
  const panes = [
    {
      menuItem: "Past Events",
      render: () => (
        <ProfileEventItems which="Past" key={"Past"} id={profile.id} />
      ),
    },
    {
      menuItem: "Future Events",
      render: () => (
        <ProfileEventItems which="Future" key={"Future"} id={profile.id} />
      ),
    },
    {
      menuItem: "Hosted Events",
      render: () => (
        <ProfileEventItems which="Hosted" key={"Hosted"} id={profile.id} />
      ),
    },
  ];
  return <Tab menu={{ secondary: true }} panes={panes} />;
}
