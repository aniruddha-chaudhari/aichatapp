// If merging configurations, remove this file and update the root babel.config.js accordingly.
// Otherwise, ensure the 'plugins' property is correctly defined as an array.
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
