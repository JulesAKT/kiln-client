import React from "react";
import { Card, Image, Button, Grid, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useFirebaseKiln from "../hooks/useFirebaseKiln";
import useBartlett from "../hooks/useBartlett";
import usePreferences from "../hooks/useFirebasePreferences";
import { kilnLogo, controllerLogo } from "../helpers/logoHelpers";
import useFirebasePreferences from "../hooks/useFirebasePreferences";
import { convertTemperature, degreeText } from "../helpers/unitHelpers";

const KilnShowPage = (props) => {
  //console.log(props);
  const id = props.match.params.id;
  const kiln = useFirebaseKiln(id);

  if (!kiln) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <Card.Header>{kiln.name}</Card.Header>
        <Card.Content>
          <Image src={kilnLogo(kiln.manufacturer)} size="massive" />
        </Card.Content>
        <Card.Content extra>
          {kiln.controller === "bartlett_genesis" && (
            <>
              <Image size="medium" src={controllerLogo(kiln.controller)} />
              <BartlettGenesisStatus kiln={kiln} />
            </>
          )}
        </Card.Content>
      </Card>

      <div>
        <Link to={`/kilns/edit/${id}`}>
          <Button>Edit</Button>
        </Link>
        <Link to={`/kilns/delete/${id}`}>
          <Button>Delete</Button>
        </Link>
      </div>
    </div>
  );
};

const BartlettGenesisStatus = ({ kiln }) => {
  console.log(kiln);
  const bartlett = useBartlett(
    kiln.controller_serial,
    kiln.controller_username,
    kiln.controller_password
  );
  const preferences = useFirebasePreferences();

  console.log(bartlett);
  const reIsATemperature = /^t(\d+)$/;
  const temperature_keys =
    bartlett?.status &&
    Object.keys(bartlett.status).filter((key) => reIsATemperature.test(key));
  console.log(temperature_keys);
  return (
    <div>
      <br />
      <Grid columns={temperature_keys?.length + 1}>
        <Grid.Row>
          {temperature_keys &&
            temperature_keys.map((key) => (
              <Grid.Column key={key} style={{ textAlign: "center" }}>
                {key}
                <br />
                <Label>
                  <Icon name="thermometer" />
                  {convertTemperature(
                    "fahrenheit",
                    preferences?.degrees,
                    bartlett?.status[key]
                  )}
                  {degreeText(preferences?.degrees)}
                </Label>
              </Grid.Column>
            ))}
          <Grid.Column style={{ float: "right" }}>
            <Icon
              name="alarm"
              color={bartlett?.status?.alarm === "OFF" ? "grey" : "red"}
              style={{ textAlign: "right", fontSize: 20, marginTop: 20 }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <p />
      Program: {bartlett?.program?.name}
      <br />
      Mode: {bartlett?.status?.mode}
      <br />
      Step: {bartlett?.status?.firing?.step}
    </div>
  );
};

export default KilnShowPage;
