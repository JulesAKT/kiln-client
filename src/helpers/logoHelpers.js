import React from "react";
import { Image, Icon } from "semantic-ui-react";

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
    case "Rohde":
      return require("../assets/rohde_logo.png").default;
    case "Jen-Ken":
      return require("../assets/jen-ken_logo.jpg").default;
    case "Cress":
      return require("../assets/cress-logo.png").default;
    case "Cromartie":
      return require("../assets/cromartie-logo.png").default;
    case "Cone Art":
      return require("../assets/coneartlogo.png").default;
    case "Woodrow":
      return require("../assets/woodrow.png").default;
    default:
      return require("../assets/nabertherm.png").default;
  }
};

export const controllerLogo = (controller) => {
  switch (controller) {
    case "bartlett_genesis":
      return require("../assets/bartlett.png").default;
    default:
      return undefined;
  }
};

export const glassImage = (glass) => {
  console.log(`glassImage - ${glass}`);
  switch (glass) {
    case "Spectrum":
      return require("../assets/spectrum.jpg").default;
    case "Bullseye":
      return require("../assets/bullseye.jpg").default;
    default:
      return require("../assets/icon.png").default;
  }
};

export const glassIcon = (glass) => {
  switch (glass) {
    case "Spectrum":
      return <Image avatar src={require("../assets/spectrum.jpg").default} />;
    case "Bottle":
      return <Icon name="beer" />;
    case "Float":
      return <Icon name="windows" />;

    case "Bullseye":
    default:
      return <Image avatar src={require("../assets/bullseye.jpg").default} />;
  }
};
