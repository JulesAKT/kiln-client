import { parse, stringify } from "zipson";
import { encode, decode } from "js-base64";

export const makeScaryURLQuery = (prefix, data) => {
  console.log("Data:");
  console.log(data);
  const zipson_string = stringify(data);
  console.log("ZIPSon String:");
  console.log(zipson_string);
  //  const uri_encoded = encodeURI(zipson_string);
  //  console.log("URIEncoded");
  //  console.log(uri_encoded);
  console.log(encode(zipson_string));
  return prefix + encode(zipson_string);
};

export const decodeScaryURLQueryParameter = (payload) => {
  console.log(payload);
  const zipson_string = decode(payload);
  console.log(zipson_string);
  const parsed_object = parse(zipson_string);
  console.log(parsed_object);
  return [
    parsed_object?.project,
    parsed_object?.firings,
    parsed_object?.segments,
  ];
};
