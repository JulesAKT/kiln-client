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
  let elapsedMins = 0;
  let currentTemperature = 20;
  let data = [{ time: elapsedMins, temperature: currentTemperature }];
  sortedSegments.forEach((segment) => {
    // Work out how long it'll take to get there.
    const timeToTemp =
      Math.abs(parseFloat(segment.temperature) - currentTemperature) /
      (parseFloat(segment.rate) / 60);
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
  });

  console.log(data);
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryAxis
        dependantAxis
        tickFormat={(x) => Math.floor(x / 60)}
        label="Hours"
        theme={VictoryTheme.material}
      />
      <VictoryLine data={data} x={"time"} y={"temperature"} />
      <VictoryScatter
        data={data}
        x={"time"}
        y={"temperature"}
        size={4}
        style={{ data: { fill: "red", strokeWidth: 30, stroke: "none" } }}
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
