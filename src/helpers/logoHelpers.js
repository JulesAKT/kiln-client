export const kilnLogo = (manufacturer) => {
  switch (manufacturer) {
    case "Olympic":
      return require("../assets/olympic.jpg").default;
    case "Paragon":
      return require("../assets/paragon.jpg").default;
    case "Kilncare":
      return require("../assets/kilncare.jpg").default;
    case "Nabertherm":
      return require("../assets/nabertherm.png").default;
    case "Evenheat":
      return require("../assets/evenheat.png").default;
    case "Skutt":
      return require("../assets/skutt.png").default;
    case "Northern":
      return require("../assets/northern.png").default;
    default:
      return require("../assets/nabertherm.png").default;
  }
};

export const glassImage = (glass) => {
  console.log(`glassImage - ${glass}`);
  switch (glass) {
    case "Spectrum":
      return require("../assets/spectrum.jpg").default;
    case "Bullseye":
    default:
      return require("../assets/bullseye.jpg").default;
  }
};
