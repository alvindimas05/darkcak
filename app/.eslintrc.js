module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "import/no-restricted-imports": ["error", {
      "paths": [{
        "name": "react-native-gesture-handler",
        "message": "Use react-native instead"
      }]
    }]
  }
};
