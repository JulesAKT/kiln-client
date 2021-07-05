import _ from "lodash";

const rgbToHex = (value) => {
  var hex = Number(value).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

export const getHexColor = (color) => {
  if (typeof color === "undefined") {
    return "black";
  }
  const { r, g, b } = color;
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return `#${red}${green}${blue}`;
};

export const getGlassReactionTypeCharacters = (code, glass_data) => {
  console.log(`Code: ${code}`);
  const code_root = code.split("-")[0];
  //  console.log(`code_root: ${code_root}`);
  //  console.log(`Reactions: ${glass_data?.reactions[code_root]}`);
  switch (glass_data?.reactions[code_root]?.reaction_type) {
    case "REACTIVE":
      return "RE";
    case "SULFUR/SELENIUM":
    case "SULFUR":
      return "S";
    case "LEAD":
      return "Pb";
    case "COPPER":
      return "Cu";
    default:
  }
  // Or... it might not be done by code-root
  switch (glass_data?.reactions[code]?.reaction_type) {
    case "REACTIVE":
      return "RE";
    case "SULFUR/SELENIUM":
    case "SULFUR":
      return "S";
    case "LEAD":
      return "Pb";
    case "COPPER":
      return "Cu";
    default:
      return "";
  }
};

export const getGlassReactionTypeColour = (code, glass_data) => {
  const code_root = code.split("-")[0];
  switch (glass_data?.reactions[code_root]?.reaction_type) {
    case "REACTIVE":
      return "#c0c0c0";
    case "SULFUR/SELENIUM":
    case "SULFUR":
      return "#f0f000";
    case "LEAD":
      return "#a0a0a0";
    case "COPPER":
      return "#00c000";
    default:
  }
  // Or... it might not be done by code-root
  switch (glass_data?.reactions[code]?.reaction_type) {
    case "REACTIVE":
      return "#c0c0c0";
    case "SULFUR/SELENIUM":
    case "SULFUR":
      return "#f0f000";
    case "LEAD":
      return "#a0a0a0";
    case "COPPER":
      return "#00c000";
    default:
      return "#ffffff";
  }
};

export const getGlassReactionTypeColourName = (code, glass_data) => {
  const code_root = code.split("-")[0];
  switch (glass_data?.reactions[code_root]?.reaction_type) {
    case "REACTIVE":
      return "brown";
    case "SULFUR/SELENIUM":
    case "SULFUR":
      return "yellow";
    case "LEAD":
      return "grey";
    case "COPPER":
      return "green";
    default:
  }
  // Or... it might not be done by code-root
  switch (glass_data?.reactions[code]?.reaction_type) {
    case "REACTIVE":
      return "brown";
    case "SULFUR/SELENIUM":
    case "SULFUR":
      return "yellow";
    case "LEAD":
      return "grey";
    case "COPPER":
      return "green";
    default:
      return "white";
  }
};

export const getReactingMaterials = (materials, glass_data) => {
  //console.log(glass_data);
  //  console.log("getReactingMaterials");
  const materials_with_reaction_types = _.mapValues(materials, (material) => ({
    ...material,
    reaction_type:
      glass_data?.reactions[material.glass_reference.split("-")[0]]
        ?.reaction_type ||
      glass_data?.reactions[material.glass_reference]?.reaction_type,
  }));
  //console.log(materials_with_reaction_types);
  const all_reaction_types = [
    ...new Set(
      Object.values(materials_with_reaction_types).map(
        (material) => material.reaction_type
      )
    ),
  ].filter((a) => a != null);

  //console.log("All Reaction Types");
  //console.log(all_reaction_types);
  // Annotate the materials list to contain only the entries that have a reaction within them.
  const reacting_materials = Object.fromEntries(
    Object.entries(materials_with_reaction_types).filter(([code, material]) =>
      reactsWith(material.reaction_type, all_reaction_types)
    )
  );
  //console.log("Reacting Materials");
  //console.log(reacting_materials);
  return reacting_materials;
};

const reactsWith = (reaction_type, all_reaction_types) => {
  switch (reaction_type) {
    case "REACTIVE":
      return all_reaction_types.includes("COPPER");
    case "SULFUR/SELENIUM":
    case "SULFUR":
      return (
        all_reaction_types.includes("COPPER") |
        all_reaction_types.includes("LEAD")
      );
    case "LEAD":
      return (
        all_reaction_types.includes("SULFUR/SELENIUM") |
        all_reaction_types.includes("SULFUR")
      );
    case "COPPER":
      return (
        all_reaction_types.includes("REACTIVE") |
        all_reaction_types.includes("SULFUR/SELENIUM") |
        all_reaction_types.includes("SULFUR")
      );
    default:
      return false;
  }
};
