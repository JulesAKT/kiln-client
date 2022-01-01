import _ from "lodash";
import { convertDegreesInSegment, degreeName } from "../helpers/unitHelpers";

export const kilnIsExportable = (kiln) => {
  return kiln?.manufacturer === "Nabertherm";
};

export const generateExportFile = (
  firing,
  segments,
  kiln,
  degrees,
  programNumber = 1
) => {
  console.log("generateExportFile called");
  if (!kiln?.manufacturer) {
    console.log("kiln not available!");
    return "";
  }
  //console.log(segments);
  const sorted_segments_array = segments.sort((a, b) => {
    return a.order - b.order;
  });

  const correct_degrees_segments = sorted_segments_array.map((segment) =>
    convertDegreesInSegment(segment, degrees)
  );

  switch (kiln?.manufacturer) {
    case "Nabertherm":
      return generateNaberthermExportFile(
        firing,
        correct_degrees_segments,
        degreeName(degrees),
        programNumber
      );
    default:
      console.log("Kiln not supported!");
      return "";
  }
};

const naberthermSanitiseName = (name) => {
  // Strip all non alphanumeric characters

  return name
    .replace(/[^A-Za-z0-9 ]+/g, "")
    .substring(0, 17)
    .toUpperCase();
};

const generateNaberthermExportFile = (
  firing,
  segments,
  degrees,
  programNumber
) => {
  const header = `<?xml version="1.0" encoding="ISO-8859-1"?>
 <?xml-stylesheet type="text/xsl" href="../STYLE/Program.xsl"?>
 <NtProgram>`;
  const footer = `</NtProgram>
 `;

  console.log(segments);
  // Nabertherms have two segments per segment. One for the heating, one for the hold.
  // Other odd thing - the last segment (the 'hold' for the final temperature should have a temperature of Zero, which the kiln interprets as 'end')
  const segments_in_xml = segments.map(
    (segment, index) => `<Segment>
 <SegNum>${index * 2 + 1}</SegNum>
 <Temperature>${_.escape(segment.temperature)}</Temperature>
 <Rate>${_.escape(segment.rate)}</Rate>
 <Extra1>0</Extra1>
 <Extra2>0</Extra2>
 <Extra3>0</Extra3>
 <Extra4>0</Extra4>
 <Extra5>0</Extra5>
 <Extra6>0</Extra6>
 <CoolEnable>0</CoolEnable>
 </Segment>
 <Segment>
 <SegNum>${index * 2 + 2}</SegNum>
 <Temperature>${
   index === segments.length - 1 ? 0 : _.escape(segment.temperature)
 }</Temperature>
 <Time>${_.escape(segment.hold)}</Time>
 <Extra1>0</Extra1>
 <Extra2>0</Extra2>
 <Extra3>0</Extra3>
 <Extra4>0</Extra4>
 <Extra5>0</Extra5>
 <Extra6>0</Extra6>
 <CoolEnable>0</CoolEnable>
 </Segment>`
  );
  const exportString =
    header +
    `
  <Name>${naberthermSanitiseName(firing.name)}</Name>
  <ProgramFlags>
  <Unit>${degrees}</Unit>
  <Holdback>false</Holdback>
  <Cascade>false</Cascade>
  <Endless>false</Endless>
  </ProgramFlags>
  <StartTemp>0</StartTemp>
  ${segments_in_xml.join("")}` +
    footer;
  //console.log(exportString);
  return exportString;
};
