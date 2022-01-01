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
// Array values are: [mintemp, maxtemp, priority]
const temperatureRanges = {
  Bullseye: {
    combing: [871, 927, 5],
    fullFuse: [804, 843, 1],
    kilnCasting: [816, 871, 5],
    kilnCarving: [816, 843, 5],
    strip: [799, 843, 2],
    tackFuse: [699, 779, 1],
    sagging: [679, 732, 1],
    fuseToStick: [679, 721, 5],
    slumping: [593, 704, 2],
    painting: [538, 677, 5],
    devit: [677, 927, 9],
  },
  Spectrum: {
    combing: [904, 927, 5],
    fullFuse: [793, 802, 1],
    tackFuse: [732, 743, 1],
    slumping: [660, 675, 1],
    anneal: [513 - 6, 513 + 6, 1],
    strain: [476 - 6, 476 + 6, 1],
  },
  "Baoli COE 85": {
    fullFuse: [830, 850, 1],
    tackFuse: [700, 760, 1],
    anneal: [528, 532, 1],
    strain: [455, 465, 1],
  },
  "Baoli COE 90": {
    fullFuse: [800, 840, 1],
    tackFuse: [688, 692, 1],
    anneal: [515, 525, 1],
    strain: [455, 455, 1],
  },
  Wissmach: {
    fullFuse: [760, 770, 1],
    tackFuse: [699, 709, 1],
    draping: [632, 642, 1],
    slumping: [688, 698, 1],
    kilnCasting: [782 - 5, 782 + 5, 5],
    combing: [871 - 5, 871 + 5, 5],
    anneal: [482 - 5, 482 + 5, 1],
    strain: [371 - 5, 371 + 5, 1],
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

export const getPriorityEnabledAnnotationsFromSegments = (
  sorted_segments,
  glass,
  degrees
) => {
  console.log(`Priority - working in: ${degrees}`);
  const relevant_temperature_ranges = getEnabledAnnotationsFromSegments(
    sorted_segments,
    glass,
    degrees
  );
  // Find the lowest numbered priority. Enable all with the same priority.
  const glassRanges = getTemperatureRanges(glass, degrees);
  const min_priority = Object.keys(relevant_temperature_ranges).reduce(
    (min_priority, range_name) =>
      glassRanges[range_name][2] < min_priority
        ? glassRanges[range_name][2]
        : min_priority,
    99
  );
  console.log("Relevant Ranges:");
  console.log(relevant_temperature_ranges);
  console.log(`Minimum Priority is: ${min_priority}`);
  const enabled_range_names = Object.keys(relevant_temperature_ranges).filter(
    (range_name) => glassRanges[range_name][2] === min_priority
  );
  console.log(enabled_range_names);

  return enabled_range_names.reduce(
    (enabled, name) => ({ ...enabled, [name]: true }),
    {}
  );
};

export const getPrincipalEnabledAnnotationFromSegments = (
  sorted_segments,
  glass,
  degrees
) => {
  const max_segment = sorted_segments.reduce(
    (max, segment) => (segment.temperature > max.temperature ? segment : max),
    { temperature: 0 }
  );
  console.log(max_segment);
  return getEnabledAnnotationsFromSegments([max_segment], glass, degrees);
};

export const getEnabledAnnotationsFromSegments = (
  sorted_segments,
  glass,
  degrees
) => {
  console.log("getEnabledAnnotationsFromSegments - sorted_segments");
  console.log(sorted_segments);
  console.log(`Working in: ${degrees}`);
  const segmentsAreWithin = sorted_segments
    .map((segment) =>
      //console.log(`Looking for an annotation for: ${segment.temperature}`);
      //console.log(temperatureRanges[glass]);
      _.map(getTemperatureRanges(glass, degrees), ([a, b], key) =>
        a <= segment.temperature && b >= segment.temperature ? key : undefined
      )
    )
    .flat()
    .filter((a) => a !== undefined)
    .reduce((ac, a) => ({ ...ac, [a]: true }), {});
  console.log("getEnabledAnnotationsFromSegments - segmentAreWithin");

  console.log(segmentsAreWithin);
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
    return Math.round(length * 25.4);
  }
};

export const lengthName = (length_unit) => {
  switch (length_unit) {
    case "in":
      return "Inches";
    case "mm":
      return "Millimetres";
    // deepcode ignore DuplicateCaseBody: In place in case we need more units later
    default:
      return "Millimetres";
  }
};
