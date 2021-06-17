import React, { useState } from "react";
import {
  Card,
  Image,
  Button,
  Grid,
  Icon,
  Label,
  Accordion,
  AccordionTitleProps,
} from "semantic-ui-react";
import { Link, RouteComponentProps } from "react-router-dom";
import useFirebaseKiln from "../hooks/useFirebaseKiln";
import useBartlett from "../hooks/useBartlett";
import useInterval from "../hooks/useInterval";
import { kilnLogo, controllerLogo } from "../helpers/logoHelpers";
import useFirebasePreferences from "../hooks/useFirebasePreferences";
import { convertTemperature, degreeText } from "../helpers/unitHelpers";
import { prettyTimeSince } from "../helpers/dates";
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic";

interface MatchParams {
  id: string;
}

const KilnShowPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const id = match.params.id;
  const kiln = useFirebaseKiln(id);

  const [dateStamp, setDateStamp] = useState<number>(Date.now());
  const bartlett = useBartlett(
    kiln?.controller_serial,
    kiln?.controller_username,
    kiln?.controller_password,
    dateStamp
  );
  useInterval(() => {
    console.log("Updating Datestamp");
    setDateStamp(Date.now());
  }, 60000);

  if (!kiln) {
    return <div>Loading...</div>;
  }
  const bartlettMode = bartlett?.status?.mode;
  const cardColour =
    bartlettMode === "Firing"
      ? "red"
      : bartlettMode === "Complete"
      ? "green"
      : "grey";

  return (
    <div style={{ width: 640 }}>
      <Card color={cardColour} fluid>
        <Card.Header>{kiln.name}</Card.Header>
        <Card.Content>
          <Image src={kilnLogo(kiln.manufacturer)} size="massive" />
        </Card.Content>
        <Card.Content extra>
          {kiln.controller === "bartlett_genesis" && (
            <>
              <Image size="medium" src={controllerLogo(kiln.controller)} />
              <BartlettGenesisStatus kiln={kiln} bartlett={bartlett} />
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

const BartlettGenesisStatus = ({
  kiln,
  bartlett,
}: {
  kiln: any;
  bartlett: any;
}) => {
  //console.log(kiln);
  const preferences = useFirebasePreferences();
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeNow, setTimeNow] = useState<number>(Date.now());

  useInterval(() => {
    setTimeNow(Date.now());
  }, 1000);

  const handleAccordion = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: AccordionTitleProps
  ) => {
    const index = data.index;
    setActiveIndex(index === activeIndex ? -1 : Number(index));
  };

  //console.log(bartlett);
  const reIsATemperature = /^t(\d+)$/;
  const temperature_keys =
    bartlett?.status &&
    Object.keys(bartlett.status).filter((key) => reIsATemperature.test(key));
  // Ridiculous typescript compliant nonsense.
  const numTemps = temperature_keys?.length ? temperature_keys.length : "1";
  //console.log(temperature_keys);
  return (
    <div>
      <br />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Grid columns={numTemps as SemanticWIDTHS}>
              <Grid.Row>
                {temperature_keys &&
                  temperature_keys.map((key: string) => (
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
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column
            style={{
              float: "right",
              //backgroundColor: "green",
              textAlign: "right",
            }}
          >
            <Icon
              name="alarm"
              color={bartlett?.status?.alarm === "OFF" ? "grey" : "red"}
              style={{
                textAlign: "right",
                fontSize: 32,
                marginTop: 20,
                //backgroundColor: "red",
              }}
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
      <br />
      Set Point: {bartlett?.status?.firing?.set_pt}
      <br />
      Last Updated: {prettyTimeSince(bartlett?.updatedAt)}
      <Accordion>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleAccordion}
        >
          <Icon name="dropdown" />
          Debug Data
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <pre>{JSON.stringify(bartlett, undefined, 2)}</pre>
        </Accordion.Content>
      </Accordion>
    </div>
  );
};

export default KilnShowPage;
