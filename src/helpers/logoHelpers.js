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
