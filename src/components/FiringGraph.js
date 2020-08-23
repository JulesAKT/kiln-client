import React from "react";

//import ReactDOM from "react-dom";

import {
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
} from "victory";

const FiringGraph = ({ sortedSegments }) => {
  console.log(sortedSegments);
  let elapsedMins = 0;
  let currentTemperature = 20;
  let data = [{ time: elapsedMins, temperature: currentTemperature }];
  sortedSegments.forEach((segment) => {
    // Work out how long it'll take to get there.
    const timeToTemp =
      Math.abs(parseFloat(segment.temperature) - currentTemperature) /
      (parseFloat(segment.rate) / 60);
    /*console.log(
      `${segment.name}:${timeToTemp} mins - Start Temp: ${currentTemperature}`
    ); */
    elapsedMins = elapsedMins + timeToTemp;
    data = data.concat([
      { time: elapsedMins, temperature: parseFloat(segment.temperature) },
    ]);
    // Then attach the hold
    if (segment.Hold !== 0) {
      elapsedMins = elapsedMins + parseFloat(segment.hold);
      data = data.concat([
        { time: elapsedMins, temperature: parseFloat(segment.temperature) },
      ]);
    }
    currentTemperature = segment.temperature;
  });

  console.log(data);
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryAxis
        dependantAxis
        tickFormat={(x) => Math.floor(x / 60)}
        label="Hours"
        style={{ axisLabel: { padding: 32 } }}
        theme={VictoryTheme.material}
      />
      <VictoryAxis
        dependentAxis
        label="Temperature"
        style={{ axisLabel: { padding: 40 } }}
        theme={VictoryTheme.material}
      />
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
  );
};

export default FiringGraph;

/* dependentAxis
        crossAxis
        
        domain={[0, 1000]}
        
        
        <VictoryAxis label="Segment Order" minDomain={{ x: 0 }} />
      <VictoryAxis dependantAxis tickFormat={(y) => `${y}degrees`} />
        
        */
