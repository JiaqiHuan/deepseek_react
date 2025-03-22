import { useState, useEffect } from "react";
//import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Container, ChartsContainer,ChartBox,Table,Th,Td} from "../styles";


// 模拟数据
const initialData = [
  { time: "10:00", temperature: 70, voltage: 220, current: 10, status: "正常" },
  { time: "10:05", temperature: 72, voltage: 225, current: 12, status: "报警" },
  { time: "10:10", temperature: 80, voltage: 230, current: 15, status: "严重" },
  { time: "10:15", temperature: 78, voltage: 240, current: 16, status: "正常" },
];

export default function PowerFireGuard() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // 模拟实时数据更新
    const interval = setInterval(() => {
      const newEntry = {
        time: new Date().toLocaleTimeString().slice(0, 5),
        temperature: Math.random() * 20 + 70,
        voltage: Math.random() * 20 + 220,
        current: Math.random() * 10 + 10,
        status: ["正常", "报警", "严重"][Math.floor(Math.random() * 3)],
      };
      setData((prevData) => [...prevData.slice(-5), newEntry]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <h1>🔥 电力火灾预防监测系统</h1>

      {/* 隐患诊断与溯源表格 */}
      

      <ChartsContainer>
        {/* 电力设备状态 */}
        <ChartBox>
          <h3>设备状态监控</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="red" />
              <Line type="monotone" dataKey="voltage" stroke="green" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 隐患状态监控 */}
        <ChartBox>
          <h3>隐患状态监控</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="blue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsContainer>
      <Table>
        <thead>
          <tr>
            <Th>时间</Th>
            <Th>温度 (℃)</Th>
            <Th>电压 (V)</Th>
            <Th>电流 (A)</Th>
            <Th>状态</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <Td>{entry.time}</Td>
              <Td>{entry.temperature}</Td>
              <Td>{entry.voltage}</Td>
              <Td>{entry.current}</Td>
              <Td>{entry.status}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  );
}
