import axios from "axios";

export const bartlogin = axios.create({
  baseURL: "https://www.bartinst.com/users",
});

export const bartkiln = axios.create({
  baseURL: "https://kiln.bartinst.com/kilns",
});
