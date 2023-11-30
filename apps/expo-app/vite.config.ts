// https://stereobooster.com/posts/react-native-web-with-vite/#final-config

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import path from "path";
// import { esbuildFlowPlugin } from "@bunchtogether/vite-plugin-flow";

// https://tamagui.dev/docs/intro/installation
const extensions = [
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
  ".mjs",
];

const development = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: true,
  plugins: [tsconfigPaths(), viteCommonjs(), react()],
  define: {
    // https://github.com/bevacqua/dragula/issues/602#issuecomment-1296313369
    global: "window",
    __DEV__: JSON.stringify(development),
    // https://tamagui.dev/docs/intro/installation
    DEV: JSON.stringify(development),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env": process.env,
  },
  resolve: {
    extensions: extensions,
    alias: {
      "react-native": "react-native-web",
      "react-native-youtube-iframe": path.resolve(
        __dirname,
        "./src/hack/YouTubeIframe.tsx",
      ),
    },
  },
  optimizeDeps: {
    include: ["@react-navigation/native"],
    esbuildOptions: {
      resolveExtensions: extensions,
      // https://github.com/vitejs/vite-plugin-react/issues/192#issuecomment-1627384670
      jsx: "automatic",
      // need either this or the plugin below
      loader: { ".js": "jsx" },
      plugins: [esbuildCommonjs(["@react-navigation/elements"])],
      // plugins: [
      //   esbuildFlowPlugin(/\.(flow|jsx?)$/, (path) =>
      //     /\.jsx$/.test(path) ? "jsx" : "jsx"
      //   ),
      // ],
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  envPrefix: ["EXPO_", "VITE_"],
});
