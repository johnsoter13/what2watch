// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

// Get the default Expo config
const config = getDefaultConfig(__dirname);

// Add custom file extensions if needed
config.resolver.assetExts.push(
  "db",      // example: if you have any database files
  "mp4",     // video files
  "ttf"      // fonts
);

// Add extra source extensions if using .cjs or .mjs files
config.resolver.sourceExts.push("cjs", "mjs");

// For Web support: make sure Metro handles assets correctly
config.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

module.exports = config;