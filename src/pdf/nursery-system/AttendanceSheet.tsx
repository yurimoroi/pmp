import React from "react";
import { Page, Text, View, Document, Line, Svg } from "@react-pdf/renderer";
import { format, getDaysInMonth } from "date-fns";
import { ja } from "date-fns/locale";
import commonStyles from "@/pdf/styles/common/styles";
import { styles } from "@/pdf/styles/nursery-system/attendanceSheet";

export type AttendanceStatus = "" | "未" | "〇" | "事" | "通" | "病" | "災" | "事停" | "通停" | "病停" | "災停" | "他" | "他停";

export interface ListData {
  name: string;
  attendance: AttendanceStatus[];
  attendanceDateCount: number;
  diseaseCount: number;
  circumstanceCount: number;
  otherCount: number;
  stopCount: number;
}

interface AttendanceSheetProps {
  className: string;
  yearMonth: string;
  listData: ListData[];
  dataCount: number[];
}

export const AttendanceSheet: React.FC<AttendanceSheetProps> = ({ className, yearMonth, listData, dataCount }) => {
  const [year, month] = yearMonth.split("-");
  const daysInMonth = getDaysInMonth(new Date(yearMonth));

  // 曜日の配列を生成
  const weekdays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(Number(year), Number(month) - 1, i + 1);
    return format(date, "E", { locale: ja });
  });

  // 保育日数の最大値を取得
  let count = 0;
  listData.forEach((data) => {
    const dateCount = data.attendance.filter((attendance) => attendance !== "").length;
    count = count < dateCount ? dateCount : count;
  });

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={commonStyles.page}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.title}>出席簿（{className}）</Text>
          <Text style={styles.date}>
            {year}年{month}月
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableNumberCell}></View>

            <View style={{ ...styles.tableNameCell, position: "relative" }}>
              <Text style={{ ...styles.tableHeaderNameCellText, top: "1px", right: "3px" }}>日</Text>
              <Text style={{ ...styles.tableHeaderNameCellText, top: "44px", right: "3px" }}>{`曜\n日`}</Text>
              <Text
                style={{
                  ...styles.tableHeaderNameCellText,
                  bottom: "1px",
                  left: "75px",
                }}
              >
                氏名
              </Text>
              <Svg height="100" width="170" style={styles.tableHeaderNameCellSvg}>
                <Line x1="0" y1="0" x2="170" y2="17.5" stroke="black" strokeWidth={1} />
                <Line x1="0" y1="0" x2="170" y2="100" stroke="black" strokeWidth={1} />
              </Svg>
            </View>

            <View style={styles.tableDateCell}>
              {weekdays.map((weekday, index) => (
                <View key={index} style={styles.tableDateCellItem}>
                  <View style={{ ...styles.tableHeaderDateCellDate, ...commonStyles.textCenter }}>
                    <Text>{(index + 1).toString()}</Text>
                  </View>

                  <View style={{ ...styles.tableHeaderDateCellDay, ...commonStyles.textCenter }}>
                    <Text>{`${weekday}\n曜\n日`}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.tableStaticticsCell}>
              <View style={styles.tableStaticticsTopCell}>
                <Text>保育日数</Text>
                <Text>{`${count}日`}</Text>
              </View>

              <View style={styles.tableStaticticsSecondCell}>
                <View
                  style={{
                    ...styles.tableStaticticsThirdCell,
                    flexDirection: "column",
                  }}
                >
                  <View style={styles.tableStaticticsFourthCell}>
                    <Text>保育日数に係る</Text>
                  </View>

                  <View style={styles.tableStaticticsFifthCell}>
                    <View
                      style={{
                        ...styles.tableStaticticsSixthCell,
                        ...commonStyles.textCenter,
                      }}
                    >
                      <Text>{`出\n席\n日\n数`}</Text>
                    </View>

                    <View style={{ ...styles.tableStaticticsSeventhCell, flexDirection: "column" }}>
                      <View style={{ ...styles.tableStaticticsEighthCell, ...commonStyles.textCenter }}>
                        <Text>欠席日数</Text>
                      </View>

                      <View style={styles.tableStaticticsNinthCell}>
                        <View style={{ ...styles.tableStaticticsTenthCell, ...commonStyles.textCenter }}>
                          <Text>{`病\n気`}</Text>
                        </View>

                        <View style={{ ...styles.tableStaticticsTenthCell, ...commonStyles.textCenter }}>
                          <Text>{`事\n欠`}</Text>
                        </View>

                        <View style={{ ...styles.tableStaticticsTenthCell, ...commonStyles.textCenter }}>
                          <Text>{`そ\nの\n他`}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ ...styles.tableStaticticsEleventhCell, ...commonStyles.textCenter }}>
                      <Text>{`出\n席\n停\n止`}</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    ...styles.tableStaticticsTwelvethCell,
                    ...commonStyles.textCenter,
                  }}
                >
                  <Text>備考</Text>
                </View>
              </View>
            </View>
          </View>

          {[...Array(20)].map((_, index) => {
            // 該当インデックスのデータが存在しない場合は空のデータを使用
            const emptyData: ListData = {
              name: "",
              attendance: Array(daysInMonth).fill(""),
              attendanceDateCount: 0,
              diseaseCount: 0,
              circumstanceCount: 0,
              otherCount: 0,
              stopCount: 0,
            };
            const data = index < listData.length ? listData[index] : emptyData;

            return (
              <View key={index} style={styles.tableBodyRow}>
                <View
                  style={{
                    ...styles.tableNumberCell,
                    ...commonStyles.textCenter,
                  }}
                >
                  <Text>{data.name ? index + 1 : ""}</Text>
                </View>

                <View
                  style={{
                    ...styles.tableNameCell,
                    ...commonStyles.textHorizontalCenter,
                    paddingLeft: "5px",
                  }}
                >
                  <Text>{data.name}</Text>
                </View>

                <View style={styles.tableDateCell}>
                  {data.attendance.map((attendance, index2) => (
                    <View key={index2} style={{ ...styles.tableDateCellItem, ...commonStyles.textCenter }}>
                      <Text
                        style={
                          attendance.includes("停")
                            ? {
                                color: "red",
                                fontWeight: "bold",
                                textDecoration: "underline",
                                textDecorationColor: "red",
                              }
                            : {}
                        }
                      >
                        {attendance.replace("停", "")}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={{ ...styles.tableStaticticsCell, display: "flex", flexDirection: "row" }}>
                  <View style={{ ...styles.tableStaticticsThirdCell, flexDirection: "row" }}>
                    <View style={styles.tableStaticticsFifthCell}>
                      <View
                        style={{
                          ...styles.tableStaticticsSixthCell,
                          ...commonStyles.textCenter,
                        }}
                      >
                        <Text>{data.attendanceDateCount}</Text>
                      </View>

                      <View style={{ ...styles.tableStaticticsSeventhCell, flexDirection: "row" }}>
                        <View style={{ ...styles.tableStaticticsTenthCell, ...commonStyles.textCenter }}>
                          <Text>{data.diseaseCount}</Text>
                        </View>

                        <View style={{ ...styles.tableStaticticsTenthCell, ...commonStyles.textCenter }}>
                          <Text>{data.circumstanceCount}</Text>
                        </View>

                        <View style={{ ...styles.tableStaticticsTenthCell, ...commonStyles.textCenter }}>
                          <Text>{data.otherCount}</Text>
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.tableStaticticsEleventhCell,
                          ...commonStyles.textCenter,
                        }}
                      >
                        <Text>{data.stopCount}</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      ...styles.tableStaticticsTwelvethCell,
                      ...commonStyles.textHorizontalCenter,
                    }}
                  >
                    <Text></Text>
                  </View>
                </View>
              </View>
            );
          })}

          <View style={styles.tableBodyRow}>
            <View style={styles.tableNumberCell}>
              <Text></Text>
            </View>

            <View style={{ ...styles.tableNameCell, ...commonStyles.textCenter }}>
              <Text>出席児数</Text>
            </View>

            <View style={styles.tableDateCell}>
              {dataCount.map((attendance, index) => (
                <View key={index} style={{ ...styles.tableDateCellItem, ...commonStyles.textCenter }}>
                  <Text>{attendance}</Text>
                </View>
              ))}
            </View>

            <View style={{ ...styles.tableStaticticsCell, display: "flex", flexDirection: "row" }}>
              <View style={{ ...styles.tableStaticticsThirdCell, flexDirection: "row" }}>
                <View style={styles.tableStaticticsFifthCell}>
                  <View
                    style={{
                      ...styles.tableStaticticsSixthCell,
                      ...commonStyles.textCenter,
                    }}
                  >
                    <Text></Text>
                  </View>

                  <View style={{ ...styles.tableStaticticsSeventhCell, flexDirection: "row" }}>
                    <View style={{ ...styles.tableStaticticsTenthCell, ...commonStyles.textCenter }}>
                      <Text></Text>
                    </View>

                    <View style={{ ...styles.tableStaticticsTenthCell, ...commonStyles.textCenter }}>
                      <Text></Text>
                    </View>

                    <View style={{ ...styles.tableStaticticsTenthCell, ...commonStyles.textCenter }}>
                      <Text></Text>
                    </View>
                  </View>

                  <View style={{ ...styles.tableStaticticsEleventhCell, ...commonStyles.textCenter }}>
                    <Text></Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  ...styles.tableStaticticsTwelvethCell,
                  ...commonStyles.textHorizontalCenter,
                }}
              >
                <Text></Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
