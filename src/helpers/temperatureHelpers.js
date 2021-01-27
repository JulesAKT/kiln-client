export const convertTemperature = (sourceDegrees, destDegrees, temperature) => {
  if (sourceDegrees === destDegrees) {
    return temperature;
  }
  if (sourceDegrees === "celsius" && destDegrees === "fahrenheit") {
    return Math.round(temperature * 1.8 + 32);
  }
  if (sourceDegrees === "fahrenheit" && destDegrees === "celsius") {
    return Math.round((temperature - 32) / 1.8);
  }
};

export const convertRate = (sourceDegrees, destDegrees, rate) => {
  if (sourceDegrees === destDegrees) {
    return rate;
  }
  if (sourceDegrees === "celsius" && destDegrees === "fahrenheit") {
    return Math.round(rate * 1.8);
  }
  if (sourceDegrees === "fahrenheit" && destDegrees === "celsius") {
    return Math.round(rate / 1.8);
  }
};

export const convertDegreesInSegment = (segment, degrees) => {
  //console.log(`Wanting in: ${degrees}, got:`);
  //console.log(segment);
  const segmentDegrees = segment.degrees ? segment.degrees : "celsius";
  const newSegment = { ...segment };
  if (segmentDegrees !== degrees) {
    //console.log("Converting segment");
    newSegment.rate = convertRate(segmentDegrees, degrees, segment.rate);
    newSegment.temperature = convertTemperature(
      segmentDegrees,
      degrees,
      segment.temperature
    );
  }
  return newSegment;
};

export const degreeText = (degrees) => {
  switch (degrees) {
    case "celsius":
      return "°C";
    case "fahrenheit":
      return "°F";
    default:
      return "°";
  }
};

export const degreeName = (degrees) => {
  return degrees === "fahrenheit" ? "Fahrenheit" : "Celsius";
};
