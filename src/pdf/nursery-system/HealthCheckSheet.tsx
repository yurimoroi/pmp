import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import commonStyles from "@/pdf/styles/common/styles";
import { styles } from "@/pdf/styles/nursery-system/healthCheckSheet";
import { HealthCheckData } from "@/types/child-pdf";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface HealthCheckSheetProps {
  className: string;
  listData: HealthCheckData[][];
}

// 空のデータ行を生成する関数
const createEmptyRow = (): HealthCheckData => ({
  attendanceAt: null,
  attendanceTime: null,
  bodyTemperature: null,
  children: {
    name: "",
  },
  childId: 0,
  pickupPerson: null,
  pickupPlanTime: null,
  playingOutside: null,
  playingWater: null,
  takeMedicineFlg: null,
});

export const HealthCheckSheet: React.FC<HealthCheckSheetProps> = ({ className, listData }) => {
  return (
    <Document>
      {listData.map((dayData, pageIndex) => {
        // 各グループの最初のデータから日付を取得
        const pageDate = dayData[0]?.attendanceAt ? new Date(dayData[0].attendanceAt) : new Date();

        // 20行分のデータを準備（足りない分は空データで埋める）
        const displayData = [...dayData];
        while (displayData.length < 20) {
          displayData.push(createEmptyRow());
        }

        return (
          <Page key={pageIndex} size="A4" style={commonStyles.page}>
            {/* ヘッダー */}
            <View style={styles.header}>
              <Text style={styles.title}>健康チェック表</Text>

              <View style={styles.subtitle}>
                <Text style={styles.date}>
                  {format(pageDate, "yyyy年MM月dd日（EEEE）", { locale: ja })}
                </Text>
                <Text style={styles.className}>{`${className}ぐみ`}</Text>
              </View>
            </View>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <View
                  style={{ ...styles.tableHeaderCell, ...commonStyles.textCenter, width: "5%" }}
                >
                  <Text>No.</Text>
                </View>

                <View
                  style={{ ...styles.tableHeaderCell, ...commonStyles.textCenter, width: "25%" }}
                >
                  <Text>園児名</Text>
                </View>

                <View
                  style={{ ...styles.tableHeaderCell, ...commonStyles.textCenter, width: "12%" }}
                >
                  <Text>登園時刻</Text>
                </View>

                <View
                  style={{ ...styles.tableHeaderCell, ...commonStyles.textCenter, width: "12%" }}
                >
                  <Text>お迎え時刻</Text>
                </View>

                <View
                  style={{ ...styles.tableHeaderCell, ...commonStyles.textCenter, width: "7%" }}
                >
                  <Text>{`お迎え\nの方`}</Text>
                </View>

                <View
                  style={{ ...styles.tableHeaderCell, ...commonStyles.textCenter, width: "12%" }}
                >
                  <Text>{`登園時の\n体温`}</Text>
                </View>

                <View
                  style={{ ...styles.tableHeaderCell, ...commonStyles.textCenter, width: "9%" }}
                >
                  <Text>{`お薬の\n有・無`}</Text>
                </View>

                <View
                  style={{ ...styles.tableHeaderCell, ...commonStyles.textCenter, width: "9%" }}
                >
                  <Text>外遊び</Text>
                </View>

                <View
                  style={{ ...styles.tableHeaderCell, ...commonStyles.textCenter, width: "9%" }}
                >
                  <Text>水遊び</Text>
                </View>
              </View>

              {displayData.map((data, index) => (
                <View key={index} style={styles.tableBodyRow}>
                  <View
                    style={{ ...styles.tableBodyCell, ...commonStyles.textCenter, width: "5%" }}
                  >
                    <Text>{index + 1}</Text>
                  </View>

                  <View
                    style={{
                      ...styles.tableBodyCell,
                      ...commonStyles.textHorizontalCenter,
                      width: "25%",
                      paddingLeft: "5px",
                    }}
                  >
                    <Text>{data.children.name}</Text>
                  </View>

                  <View
                    style={{ ...styles.tableBodyCell, ...commonStyles.textCenter, width: "12%" }}
                  >
                    <Text>{data.attendanceTime ? format(data.attendanceTime, "HH:mm") : ""}</Text>
                  </View>

                  <View
                    style={{ ...styles.tableBodyCell, ...commonStyles.textCenter, width: "12%" }}
                  >
                    <Text>{data.pickupPlanTime || ""}</Text>
                  </View>

                  <View
                    style={{ ...styles.tableBodyCell, ...commonStyles.textCenter, width: "7%" }}
                  >
                    <Text>{data.pickupPerson || ""}</Text>
                  </View>

                  <View
                    style={{ ...styles.tableBodyCell, ...commonStyles.textCenter, width: "12%" }}
                  >
                    <Text>{data.bodyTemperature ? `${data.bodyTemperature.toFixed(1)}℃` : ""}</Text>
                  </View>

                  <View
                    style={{ ...styles.tableBodyCell, ...commonStyles.textCenter, width: "9%" }}
                  >
                    <Text>
                      {data.takeMedicineFlg === true
                        ? "あり"
                        : data.takeMedicineFlg === false
                        ? "なし"
                        : ""}
                    </Text>
                  </View>

                  <View
                    style={{ ...styles.tableBodyCell, ...commonStyles.textCenter, width: "9%" }}
                  >
                    <Text>
                      {data.playingOutside === true
                        ? "〇"
                        : data.playingOutside === false
                        ? "×"
                        : ""}
                    </Text>
                  </View>

                  <View
                    style={{ ...styles.tableBodyCell, ...commonStyles.textCenter, width: "9%" }}
                  >
                    <Text>
                      {data.playingWater === true ? "〇" : data.playingWater === false ? "×" : ""}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Page>
        );
      })}
    </Document>
  );
};
