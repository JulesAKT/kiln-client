import { stringify } from "zipson";

export const makeScaryURLQuery = (data) => {
  console.log("Data:");
  console.log(data);
  const zipson_string = stringify(data);
  console.log("ZIPSon String:");
  console.log(zipson_string);
  const uri_encoded = encodeURI(zipson_string);
  console.log("URIEncoded");
  console.log(uri_encoded);
  return uri_encoded;
};
