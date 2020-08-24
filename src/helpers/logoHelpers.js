export const kilnLogo = (manufacturer) => {
  switch (manufacturer) {
    case "Olympic":
      return require("../assets/olympic.jpg");
    case "Paragon":
      return require("../assets/paragon.jpg");
    case "Kilncare":
      return require("../assets/kilncare.jpg");
    case "Nabertherm":
      return require("../assets/nabertherm.png");
    case "Evenheat":
      return require("../assets/evenheat.png");
    case "Skutt":
      return require("../assets/skutt.png");
    case "Northern":
      return require("../assets/northern.jpg");
    default:
      return require("../assets/nabertherm.png");
  }
};

export const glassImage = (glass) => {
  switch (glass) {
    case "Spectrum":
      return require("../assets/spectrum.jpg");
    case "Bullseye":
    default:
      return require("../assets/bullseye.jpg");
  }
};
