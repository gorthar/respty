import { Card, CardGroup, Placeholder } from "semantic-ui-react";

export default function ProfileConnectionsPlaceholder() {
  return (
    <CardGroup itemsPerRow={4}>
      <Card>
        <Placeholder>
          <Placeholder.Image
            style={{ height: "150px", width: "150px" }}
          ></Placeholder.Image>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Card>
    </CardGroup>
  );
}
