import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import _ from "lodash";
import InputRange from "react-input-range";
import { saveAs } from "file-saver";

import Modal from "../Modal";
import "react-input-range/lib/css/index.css";
import history from "../history";
import useFirebaseSegments from "../hooks/useFirebaseSegments";
import useFirebaseFiring from "../hooks/useFirebaseFiring";
import useFirebasePreferences from "../hooks/useFirebasePreferences";
import useFirebaseKiln from "../hooks/useFirebaseKiln";
import { generateExportFile } from "../helpers/exportHelpers";

const FiringExportPage = (props) => {
  const firing = useFirebaseFiring(props.match.params.id);
  const kiln = useFirebaseKiln(props.match.params.kiln);
  const segments = useFirebaseSegments();
  const preferences = useFirebasePreferences();
  const [naberthermProgramNumber, setNaberthermProgramNumber] = useState({
    value: 1,
  });

  const degrees =
    preferences && preferences.degrees
      ? preferences && preferences.degrees
      : "celsius";

  const my_segments = _.filter(
    segments,
    (segment) => segment && segment.firing_id === props.match.params.id
  );

  const saveExportedFile = () => {
    const fileContents = generateExportFile(
      firing,
      my_segments,
      kiln,
      degrees,
      naberthermProgramNumber.value
    );
    const blob = new Blob([fileContents], {
      type: "text/plain; charset=utf-8",
    });
    saveAs(
      blob,
      "prog." +
        naberthermProgramNumber.value.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
        ".xml"
    );
  };

  const actions = () => (
    <React.Fragment>
      <Button
        disabled={my_segments.length === 0}
        onClick={() => {
          saveExportedFile();
        }}
      >
        Export
      </Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </React.Fragment>
  );

  const renderContent = () => {
    if (!firing || !segments || !kiln) {
      return <div>Loading...</div>;
    }
    if (my_segments.length === 0) {
      return (
        <div>This firing has no segments. There's no point exporting this!</div>
      );
    }
    return (
      <React.Fragment>
        <div>
          <p>
            <b>
              Warning!!! This hasn't been tested on real kilns yet. Don't be
              upset if the Kiln doesn't accept it, or freaks out and melts
              itself, or the controller just crashes.
            </b>
          </p>
          <p>
            You'll need to take this generated file, and place it in a directory
            called 'IMPORT' on the root directory of your USB stick.
          </p>
        </div>
        <p />
        <div>Name: {firing.name}</div>
        {kiln.manufacturer === "Nabertherm" && (
          <div>
            <form name="programNumber">
              <span>Program Number: {naberthermProgramNumber.value}</span>
              <p />
              <span>
                <InputRange
                  maxValue={10}
                  minValue={1}
                  value={naberthermProgramNumber.value}
                  onChange={(value) => setNaberthermProgramNumber({ value })}
                />
              </span>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <Modal
      title="Export Firing"
      content={renderContent()}
      actions={actions()}
      onDismiss={() => history.goBack()}
    />
  );
};

export default FiringExportPage;
