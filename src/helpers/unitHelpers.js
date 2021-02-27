import _ from "lodash";

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
export const convertTemperatures = (
  sourceDegrees,
  destDegrees,
  temperatures
) => {
  return temperatures.map((temperature) =>
    convertTemperature(sourceDegrees, destDegrees, temperature)
  );
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

const temperatureRanges = {
  bullseye: {
    combing: [871, 927, 1],
    fullFuse: [804, 843, 1],
    kilnCasting: [816, 871, 1],
    kilnCarving: [816, 843, 1],
    strip: [799, 843],
    tackFuse: [699, 779],
    sagging: [679, 732],
    fuseToStick: [679, 721],
    slumping: [593, 704],
    painting: [538, 677],
    devit: [677, 927],
  },
};

export const temperatureRangeNames = {
  combing: "Combing",
  fullFuse: "Full Fuse",
  kilnCasting: "Kiln Casting",
  kilnCarving: "Kiln Carving",
  strip: "Strip",
  tackFuse: "Tack Fuse",
  sagging: "Sagging",
  fuseToStick: "Fuse To Stick",
  slumping: "Slumping",
  painting: "Painting",
  devit: "Devit",
};

export const temperatureRangeColours = {
  combing: "#f04040",
  fullFuse: "#f0c0c0",
  kilnCasting: "blue",
  kilnCarving: "green",
  strip: "yellow",
  tackFuse: "#912349",
  sagging: "#abab00",
  fuseToStick: "#ab00ab",
  slumping: "#00b040",
  painting: "#10b030",
  devit: "#c00000",
};
export const getTemperatureRanges = (
  glass = "bullseye",
  degrees = "celsius"
) => {
  return _.mapValues(temperatureRanges[glass], (value) =>
    convertTemperatures("celsius", degrees, value)
  );
};

export const fullFuseRange = (glass = "bullseye", degrees = "celsius") => {
  switch (glass) {
    case "bullseye":
      return convertTemperatures("celsius", degrees, [804, 843]);
    case "spectrum":
      return convertTemperatures("celsius", degrees, [804, 843]); // Not confirmed!
    default:
      return convertTemperatures("celsius", degrees, [804, 843]);
  }
};

export const convertLengthUnit = (sourceUnit = "mm", destUnit, length) => {
  if (sourceUnit === destUnit) {
    return length;
  }
  if (sourceUnit === "mm" && destUnit === "in") {
    return (length / 25.4).toFixed(2);
  }
  if (sourceUnit === "in" && destUnit === "mm") {
    return Math.round(length * 25.4, 0);
  }
};

export const lengthName = (length_unit) => {
  switch (length_unit) {
    case "in":
      return "Inches";
    case "mm":
      return "Millimetres";
    default:
      return "Millimetres";
  }
};
