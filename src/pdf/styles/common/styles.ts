import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Nasu",
  fonts: [
    {
      src: "../../../fonts/Nasu-Regular.ttf",
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: "../../../fonts/Nasu-Bold.ttf",
      fontWeight: "bold",
      fontStyle: "normal",
    },
  ],
});

const commonStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Nasu",
    backgroundColor: "white",
    fontSize: 10,
  },
  textCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textHorizontalCenter: {
    display: "flex",
    justifyContent: "center",
  },
  textVerticalCenter: {
    display: "flex",
    alignItems: "center",
  },
});

export default commonStyles;
