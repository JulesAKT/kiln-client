export const convertSegmentsToTimedController = (segments, kiln) => {
  const timed_controller = kiln?.timed_controller;
  const ambient_temperature = kiln?.ambient_temperature || "18";

  // If it's not a timed controller, just return the segments un-ruined.
  if (!timed_controller) {
    return segments;
  }

  let last_temperature = ambient_temperature;
  let fixed_segments = [];
  //console.log("Passed:");
  //console.log(segments);
  //console.log(`Ambient: ${ambient_temperature}`);
  for (let segment of segments) {
    const timeToTemperature = Math.abs(
      ((segment.temperature - last_temperature) / segment.rate) * 60
    );
    //console.log(`${segment.order} - ${segment.name} - ${timeToTemperature}`);
    const minsToTemperature = Math.round(timeToTemperature % 60)
      .toString()
      .padStart(2, "0");
    const hoursToTemperature = Math.round(
      (timeToTemperature - minsToTemperature) / 60
    );
    last_temperature = segment.temperature;
    fixed_segments.push({
      ...segment,
      temperature: `${hoursToTemperature}:${minsToTemperature}`,
    });
  }
  return fixed_segments;
};
