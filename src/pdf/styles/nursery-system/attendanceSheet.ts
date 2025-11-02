import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    height: "93%",
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
  },
  tableHeaderRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100px",
    borderBottom: "1px solid black",
  },
  tableNumberCell: {
    width: "2%",
    height: "100%",
    borderRight: "1px solid black",
  },

  tableNameCell: {
    width: "170px",
    height: "100%",
    borderRight: "1px solid black",
  },
  tableHeaderNameCellText: {
    position: "absolute",
  },
  tableHeaderNameCellSvg: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  tableDateCell: {
    width: "62%",
    display: "flex",
    flexDirection: "row",
  },
  tableDateCellItem: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid black",
  },
  tableHeaderDateCellDate: {
    width: "100%",
    height: "18%",
    borderBottom: "1px solid black",
  },
  tableHeaderDateCellDay: {
    width: "100%",
    height: "82%",
  },

  tableStaticticsCell: {
    width: "15%",
    height: "100%",
  },
  tableStaticticsTopCell: {
    width: "100%",
    height: "18%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 5px",
    borderBottom: "1px solid black",
  },
  tableStaticticsSecondCell: {
    width: "100%",
    height: "82%",
    display: "flex",
    flexDirection: "row",
    fontSize: 8,
  },
  tableStaticticsThirdCell: {
    width: "70%",
    height: "100%",
    display: "flex",
  },
  tableStaticticsFourthCell: {
    width: "100%",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
  },
  tableStaticticsFifthCell: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  tableStaticticsSixthCell: {
    width: "20%",
    height: "100%",
    borderRight: "1px solid black",
  },
  tableStaticticsSeventhCell: {
    width: "60%",
    height: "100%",
    display: "flex",
  },
  tableStaticticsEighthCell: {
    width: "100%",
    height: "25%",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
  },
  tableStaticticsNinthCell: {
    width: "100%",
    height: "75%",
    display: "flex",
    flexDirection: "row",
  },
  tableStaticticsTenthCell: {
    width: "33.33%",
    height: "100%",
    borderRight: "1px solid black",
  },
  tableStaticticsEleventhCell: {
    width: "20%",
    height: "100%",
    borderRight: "1px solid black",
  },
  tableStaticticsTwelvethCell: {
    width: "30%",
    height: "100%",
  },

  tableBodyRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "20px",
    borderBottom: "1px solid black",
    fontSize: 8,
  },
  // tableBodyRowStaticticsCellItems: {
  //   width: "70%",
  //   height: "100%",
  //   display: "flex",
  //   flexDirection: "row",
  // },
  tableBodyRowStaticticsCellItem: {
    width: "25%",
    height: "100%",
    borderRight: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tableBodyRowNoteCell: {
    width: "30%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
});
