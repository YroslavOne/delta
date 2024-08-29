import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./PerformanceTable.module.css";

interface DataRow {
  name: string;
  current: number;
  previous: number;
  weekly: number;
  change: number;
}

const data: DataRow[] = [
  {
    name: "Выручка, руб",
    current: 500521,
    previous: 480521,
    weekly: 4805121,
    change: 4,
  },
  {
    name: "Наличные",
    current: 300000,
    previous: 300000,
    weekly: 300000,
    change: 0,
  },
  {
    name: "Безналичный расчет",
    current: 100000,
    previous: 100000,
    weekly: 100000,
    change: 0,
  },
  {
    name: "Кредитные карты",
    current: 100521,
    previous: 100521,
    weekly: 100521,
    change: 0,
  },
  {
    name: "Средний чек, руб",
    current: 1000,
    previous: 900,
    weekly: 900,
    change: 44,
  },
  {
    name: "Средний гость, руб",
    current: 1200,
    previous: 800,
    weekly: 900,
    change: 50,
  },
  {
    name: "Удаления из чека (после оплаты), руб",
    current: 100,
    previous: 1100,
    weekly: 100,
    change: -9,
  },
  {
    name: "Удаления из чека (до оплаты), руб",
    current: 1000,
    previous: 1100,
    weekly: 900,
    change: -7,
  },
  {
    name: "Количество чеков",
    current: 34,
    previous: 36,
    weekly: 34,
    change: -6,
  },
  {
    name: "Количество гостей",
    current: 34,
    previous: 36,
    weekly: 32,
    change: -6,
  },
];

const PerformanceTable: React.FC = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index); // Снимает выделение при повторном клике
  };

  const getChartOptions = (row: DataRow) => ({
    title: "",
    xAxis: {
        title: "dcd",
        categories: ["Текущий день", "Вчера", "Этот день недели"],
        labels: {
          enabled: false,  
          format: "", 
          
        },
        lineWidth: 1,
        tickWidth: 5,
        tickLength: 5,
        gridLineWidth: 0,     
      },
    yAxis: {
        title: "",
        labels: {
          enabled: false,  
          format: " ", 
          
        },
        lineWidth: 1,
        tickWidth: 5,
        tickLength: 5,
        gridLineWidth: 0,     
      },
    series: [
      {
        name: row.name,
        data: [row.current, row.previous, row.weekly],
        color: 'green',
        marker: {
            enabled: true // Включаем отображение точек
          },
        showInLegend: false,
      },
      
    ],
  });

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Показатель</TableCell>
              <TableCell className={styles.defaultCell}>Текущий день</TableCell>
              <TableCell>Вчера</TableCell>
              <TableCell>Этот день недели</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <React.Fragment key={row.name}>
                <TableRow onClick={() => handleRowClick(index)}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell
                    style={{ textAlign: "right" }}
                    className={styles.defaultCell}
                  >
                    {formatNumber(row.current)}
                  </TableCell>
                  <TableCell
                    style={{ display: "flex" }}
                    className={`${styles.inlineFlex} ${
                      row.change > 0 ? styles.positive : styles.negative
                    }`}
                  >
                    {formatNumber(row.previous)}{" "}
                    <span
                      className={
                        row.change > 0 ? styles.positive : styles.negative
                      }
                    >
                      {row.change}%
                    </span>
                  </TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    {formatNumber(row.weekly)}
                  </TableCell>
                </TableRow>
                {selectedRowIndex === index && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={getChartOptions(row)}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PerformanceTable;
