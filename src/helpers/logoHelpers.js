export const kilnLogo = (manufacturer) => {
  switch (manufacturer) {
    case "Olympic":
      return require("../assets/olympic.jpg");
    case "Paragon":
      return require("../assets/paragon.jpg");
    case "Kilncare":
      return require("../assets/kilncare.jpg");
    case "Nabertherm":
    default:
      return require("../assets/nabertherm.png");
  }
};
