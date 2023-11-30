import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import fs from "fs";

const fullConfig = resolveConfig(tailwindConfig);

type ShadeKeys =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";
type ColorNames =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

type ColorShade = {
  [K in ShadeKeys]: string;
};

type Color = {
  [K in ColorNames]: ColorShade;
};

export const colors = fullConfig.theme?.colors as Color;

// // Save that config to a json file
// fs.writeFileSync("tailwind.json", colors);
