import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer} from "recharts";
import { Container, ChartsContainer, ChartBox, Button, Table, Th, Td } from "../styles"; // 👈 导入样式

// 📌 模拟轧制过程数据
const initialData = [
  { time: "10:00", temperature: 1150, stress: 150, speed: 2.1, qualityScore: 90 },
  { time: "10:05", temperature: 1170, stress: 160, speed: 2.3, qualityScore: 85 },
  { time: "10:10", temperature: 1180, stress: 170, speed: 2.5, qualityScore: 80 },
];

// 📌 质量缺陷批次数据
const initialBatches = [
  { batch: "A101", defectRate: 1.2, order: "钢板 5mm", standard: "GB/T 709" },
  { batch: "A102", defectRate: 1.5, order: "钢管 10mm", standard: "ASTM A36" },
  { batch: "A103", defectRate: 1.8, order: "不锈钢 3mm", standard: "GB/T 3280" },
];

export default function RollingControl() {
  const [data, setData] = useState(initialData);
  const [batches, setBatches] = useState(initialBatches);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        time: new Date().toLocaleTimeString().slice(0, 5),
        temperature: Math.random() * 50 + 1100,
        stress: Math.random() * 50 + 140,
        speed: Math.random() * 1.5 + 2.0,
        qualityScore: Math.random() * 20 + 70,
      };

      setData(prevData => [...prevData.slice(-5), newEntry]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 📌 生成新批次数据
  const generateNewBatch = () => {
    const newBatch = {
      batch: `A${Math.floor(Math.random() * 900 + 100)}`,
      defectRate: parseFloat((Math.random() * 2).toFixed(2)),  // 确保 defectRate 是 number 类型
      order: ["钢板 5mm", "钢管 10mm", "不锈钢 3mm"][Math.floor(Math.random() * 3)],
      standard: ["GB/T 709", "ASTM A36", "GB/T 3280"][Math.floor(Math.random() * 3)],
    };
  
    setBatches(prevBatches => [newBatch, ...prevBatches.slice(0, 4)]);
  };
  

  return (
    <Container>
      <h1>🛠 热轧敏捷控制系统</h1>

      <ChartsContainer>
        {/* 🌡️ 钢坯冷却温度曲线 */}
        <ChartBox>
          <h3>🌡️ 钢坯温度变化</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[1000, 1250]} unit="℃" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={1200} stroke="red" label="⚠️ 超温" />
              <Line type="monotone" dataKey="temperature" stroke="orange" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 🔄 轧制应力监测 */}
        <ChartBox>
          <h3>🔄 轧制应力监测</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[100, 200]} unit="MPa" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={180} stroke="red" label="⚠️ 超标" />
              <Line type="monotone" dataKey="stress" stroke="blue" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 📉 轧制速度分析 */}
        <ChartBox>
          <h3>📉 轧辊速度调整</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[1.5, 3.5]} unit="m/s" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="speed" stroke="green" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 📊 质量评分趋势 */}
        <ChartBox>
          <h3>📊 质量评分趋势</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[60, 100]} unit="分" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={75} stroke="red" label="⚠️ 低于标准" />
              <Line type="monotone" dataKey="qualityScore" stroke="purple" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsContainer>

      {/* 🛠 质量缺陷批次表格 */}
      <h2>📋 质量缺陷批次数据</h2>
      <Table>
        <thead>
          <tr>
            <Th>批次号</Th>
            <Th>缺陷率 (%)</Th>
            <Th>订单规格</Th>
            <Th>质量标准</Th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch, index) => (
            <tr key={index}>
              <Td>{batch.batch}</Td>
              <Td>{batch.defectRate}</Td>
              <Td>{batch.order}</Td>
              <Td>{batch.standard}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 生成新批次 */}
      <Button onClick={generateNewBatch}>➕ 生成新批次</Button>
    </Container>
  );
}
