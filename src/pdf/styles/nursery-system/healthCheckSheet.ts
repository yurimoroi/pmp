import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 12,
  },
  className: {
    fontSize: 14,
  },
  table: {
    width: "100%",
    height: "88%",
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "10%",
    borderBottom: "1px solid black",
  },
  tableHeaderCell: {
    height: "100%",
    borderRight: "1px solid black",
    textAlign: "center",
  },

  tableBodyRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "4.5%",
    borderBottom: "1px solid black",
  },
  tableBodyCell: {
    height: "100%",
    borderRight: "1px solid black",
  },
});
