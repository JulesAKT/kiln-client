import axios from "axios";

const etsy = axios.create({
  baseURL: "https://api.etsy.com/v3/application/",
  headers: { "x-api-key": "01g46wm0sf3fu9d56b7l1362" },
});

export default etsy;
