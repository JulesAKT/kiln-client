import { parse, stringify } from "zipson";
import { encode, decode } from "js-base64";

export const makeScaryURLQuery = (prefix, data) => {
  console.log("Data:");
  console.log(data);
  const zipson_string = stringify(data);
  const encoded_string = encode(zipson_string);
  //console.log("ZIPSon String:");
  //console.log(zipson_string);
  const chunks = chunkSubstr(encoded_string, 256);
  const encoded_chunks = chunks.map((chunk) => encodeURIComponent(chunk));
  const final_string = encoded_chunks.join("/");
  //  const uri_encoded = encodeURI(zipson_string);

  //  console.log("URIEncoded");
  //  console.log(uri_encoded);
  //console.log(encode(zipson_string));
  console.log(
    `Lengths - Zipson_string: ${zipson_string.length} - encoded_string: ${encoded_string.length} - Final: ${final_string.length}`
  );
  return prefix + final_string;
};

export const decodeScaryURLQueryParameter = (payload) => {
  console.log(payload);
  const chunks = payload.split("/");

  console.log(chunks);
  const de_URId_chunks = chunks.map((chunk) => decodeURIComponent(chunk));
  const zipson_string_encoded = de_URId_chunks.join("");
  const zipson_string = decode(zipson_string_encoded);
  //const zipson_string = decode(payload);
  const parsed_object = parse(zipson_string);
  console.log(parsed_object);
  console.log(
    `Lengths - - Zipson_string: ${zipson_string.length} - encoded_string: ${zipson_string_encoded.length} - Final: ${payload.length}`
  );
  return [
    parsed_object?.project,
    parsed_object?.firings,
    parsed_object?.segments,
  ];
};
// Borrowed from Stack overflow

function chunkSubstr(str, size) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}
