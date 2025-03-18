import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
const Container = styled.div`
  padding: 20px;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ChartBox = styled.div`
  flex: 1;
  min-width: 300px;
  background: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
  color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }

  th {
    background-color: #333;
    color: white;
  }
`;

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
      <Title>🔥 电力火灾预防监测系统</Title>

      {/* 隐患诊断与溯源表格 */}
      <DataTable>
        <thead>
          <tr>
            <th>时间</th>
            <th>温度 (℃)</th>
            <th>电压 (V)</th>
            <th>电流 (A)</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.time}</td>
              <td>{entry.temperature}</td>
              <td>{entry.voltage}</td>
              <td>{entry.current}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </DataTable>

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
    </Container>
  );
}
