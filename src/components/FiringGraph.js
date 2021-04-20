import React, { useState, useEffect } from "react";

//import ReactDOM from "react-dom";

import {
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
  VictoryArea,
  VictoryLabel,
} from "victory";
import { Button, Grid, Header } from "semantic-ui-react";
import {
  degreeText,
  getTemperatureRanges,
  temperatureRangeColours,
  temperatureRangeNames,
  //getEnabledAnnotationsFromSegments,
  //getPrincipalEnabledAnnotationFromSegments,
  getPriorityEnabledAnnotationsFromSegments,
} from "../helpers/unitHelpers";

const FiringGraph = ({
  sortedSegments,
  degrees,
  project,
  showAnnotations = true,
}) => {
  const [enabledAnnotations, setEnabledAnnotations] = useState({});

  useEffect(() => {
    const enabled = getPriorityEnabledAnnotationsFromSegments(
      sortedSegments,
      project?.glass,
      degrees
    );
    console.log(enabled);
    setEnabledAnnotations(enabled);
  }, [project, sortedSegments, degrees]);
  const handleChangedCheckbox = (key) => {
    console.log("handling Change");

    setEnabledAnnotations({
      ...enabledAnnotations,
      [key]: !enabledAnnotations[key],
    });
  };

  let elapsedMins = 0;
  let currentTemperature = 20;
  let data = [{ time: elapsedMins, temperature: currentTemperature }];
  sortedSegments.forEach((segment) => {
    // Work out how long it'll take to get there.
    const timeToTemp =
      Math.abs(parseFloat(segment.temperature) - currentTemperature) /
      (parseFloat(segment.rate) / 60);
    /* console.log(
      `${segment.name}:${timeToTemp} mins - Start Temp: ${currentTemperature}`
    ); */
    elapsedMins = elapsedMins + timeToTemp;
    data = data.concat([
      { time: elapsedMins / 60, temperature: parseFloat(segment.temperature) },
    ]);
    // Then attach the hold
    if (segment.Hold !== 0) {
      elapsedMins = elapsedMins + parseFloat(segment.hold);
      data = data.concat([
        {
          time: elapsedMins / 60,
          temperature: parseFloat(segment.temperature),
        },
      ]);
    }
    // console.log("Elapsed Time: " + elapsedMins);
    currentTemperature = segment.temperature;
  });
  const temperatureRanges = getTemperatureRanges(project?.glass, degrees);

  //console.log(enabledAnnotations);
  //console.log(temperatureRanges);
  //console.log(Object.keys(temperatureRanges));
  //console.log(temperatureRangeNames);
  //console.log(data);
  console.log(enabledAnnotations);
  return (
    <Grid>
      <Grid.Column width={14}>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryAxis
            dependantAxis
            tickFormat={(x) => Math.floor(x)}
            //        tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((x) => x * 60)}
            label="Hours"
            style={{ axisLabel: { padding: 32 } }}
            theme={VictoryTheme.material}
          />
          <VictoryAxis
            dependentAxis
            label={`Temperature ${degreeText(degrees)}`}
            style={{ axisLabel: { padding: 38 } }}
            theme={VictoryTheme.material}
          />
          {showAnnotations &&
            Object.keys(temperatureRanges).map(
              (key) =>
                enabledAnnotations[key] && (
                  <VictoryArea
                    key={`${key}.area`}
                    style={{ data: { fill: temperatureRangeColours[key] } }}
                    data={[
                      {
                        x: 0,
                        y: temperatureRanges[key][1],
                        y0: temperatureRanges[key][0],
                      },
                      {
                        x: elapsedMins / 60,
                        y: temperatureRanges[key][1],
                        y0: temperatureRanges[key][0],
                      },
                    ]}
                  />
                )
            )}
          {showAnnotations &&
            Object.keys(temperatureRanges).map(
              (key) =>
                enabledAnnotations[key] && (
                  <VictoryLabel
                    key={`${key}.label`}
                    text={temperatureRangeNames[key]}
                    style={{ fontSize: 6 }}
                    datum={{
                      x: (elapsedMins / 60) * 0.9,
                      y:
                        (temperatureRanges[key][0] +
                          temperatureRanges[key][1]) /
                        2,
                    }}
                    textAnchor="middle"
                  />
                )
            )}
          <VictoryLine
            data={data}
            x={"time"}
            y={"temperature"}
            style={{
              data: { strokeWidth: 1.5, strokeLinecap: "round" },
            }}
          />
          <VictoryScatter
            data={data}
            x={"time"}
            y={"temperature"}
            dx={-12}
            size={3}
            style={{ data: { fill: "red", strokeWidth: 5, stroke: "none" } }}
          />
        </VictoryChart>
      </Grid.Column>

      {showAnnotations && (
        <Grid.Column width={2}>
          <Header>Process Temps for {project?.glass}</Header>
          {Object.keys(temperatureRanges).map((key) => (
            <Button
              key={key}
              primary={!!enabledAnnotations[key]}
              style={{
                marginBottom: "4px",
                backgroundColor:
                  !!enabledAnnotations[key] && temperatureRangeColours[key],
              }}
              onClick={() => {
                handleChangedCheckbox(key);
              }}
            >
              {temperatureRangeNames[key]}
            </Button>
          ))}
        </Grid.Column>
      )}
    </Grid>
  );
};

export default FiringGraph;

/* dependentAxis
        crossAxis
        
        domain={[0, 1000]}
        
        
        <VictoryAxis label="Segment Order" minDomain={{ x: 0 }} />
      <VictoryAxis dependantAxis tickFormat={(y) => `${y}degrees`} />



          <span style={{ paddingLeft: "8px", paddingRight: "4px" }}>
            <input
              key={key}
              type="checkbox"
              checked={!!enabledAnnotations[key]}
              onChange={() => {
                handleChangedCheckbox(key);
              }}
            />
            {temperatureRangeNames[key]}
          </span>


        */
