module.exports = {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@screens": "./src/screens",
            "@screens/*": "./src/screens/*",
            "@components/*": "./src/components/*",
            "@hooks": "./src/hooks",
            "@api": "./src/api",
            "@icons": "./assets/icons",
            "@assets/*": "./assets/*",
            "@utils/*": "./src/utils/*",
            "@context/*": "./src/context/*",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
  