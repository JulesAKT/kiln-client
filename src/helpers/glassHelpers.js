const rgbToHex = (value) => {
  var hex = Number(value).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

export const getHexColor = ({ r, g, b }) => {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return `#${red}${green}${blue}`;
};
