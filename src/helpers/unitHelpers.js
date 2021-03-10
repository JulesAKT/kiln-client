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
  Bullseye: {
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
  Spectrum: {
    combing: [904, 927, 1],
    fullFuse: [793, 802, 1],
    tackFuse: [732, 743],
    slumping: [660, 675],
    anneal: [513 - 6, 513 + 6],
    strain: [476 - 6, 476 + 6],
  },
  "Baoli COE 85": {
    fullFuse: [830, 850],
    tackFuse: [700, 760],
    anneal: [528, 532],
    strain: [455, 465],
  },
  "Baoli COE 90": {
    fullFuse: [800, 840],
    tackFuse: [688, 692],
    anneal: [515, 525],
    strain: [455, 455],
  },
  Wissmach: {
    fullFuse: [760, 770],
    tackFuse: [699, 709],
    draping: [632, 642],
    slumping: [688, 698],
    kilnCasting: [782 - 5, 782 + 5],
    combing: [871 - 5, 871 + 5],
    anneal: [482 - 5, 482 + 5],
    strain: [371 - 5, 371 + 5],
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
  slumping: "Slump",
  painting: "Painting",
  devit: "Devit",
  anneal: "Anneal",
  strain: "Strain",
  draping: "Drape",
};

export const getEnabledAnnotationsFromSegments = (sorted_segments, glass) => {
  const segmentsAreWithin = sorted_segments
    .map((segment) =>
      //console.log(`Looking for an annotation for: ${segment.temperature}`);
      //console.log(temperatureRanges[glass]);
      _.map(temperatureRanges[glass], ([a, b], key) =>
        a < segment.temperature && b > segment.temperature ? key : undefined
      )
    )
    .flat()
    .filter((a) => a !== undefined)
    .reduce((ac, a) => ((ac[a] = true), ac), {});
  return segmentsAreWithin;
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
  anneal: "lightGrey",
  strain: "lightGreen",
  draping: "lightBlue",
};
export const getTemperatureRanges = (
  glass = "Bullseye",
  degrees = "celsius"
) => {
  if (!glass) {
    return {};
  }
  return _.mapValues(temperatureRanges[glass], (value) =>
    convertTemperatures("celsius", degrees, value)
  );
};
/* 
export const fullFuseRange = (glass = "Bullseye", degrees = "celsius") => {
  switch (glass) {
    case "Bullseye":
      return convertTemperatures("celsius", degrees, [804, 843]);
    case "Spectrum":
      return convertTemperatures("celsius", degrees, [804, 843]); // Not confirmed!
    default:
      return convertTemperatures("celsius", degrees, [804, 843]);
  }
};
*/

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
