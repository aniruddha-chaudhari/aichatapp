
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// ...existing code...

defaultConfig.resolver.extraNodeModules = {
  // ...existing mappings...
  "@supabase/postgrest-js": require.resolve("@supabase/postgrest-js"),
};

// ...existing code...

module.exports = defaultConfig;