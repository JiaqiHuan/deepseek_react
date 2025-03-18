import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// 📌 组件样式
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

const WarningBox = styled.div`
  background: #ff4444;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
`;

export default function Dashboard() {
  // 📌 状态管理（模拟实时数据）
  const [data, setData] = useState([
    { time: "10:00", temp: 1150, CO2: 0.04, SO2: 0.002, NOx: 0.01, oxygen: 20.9, thickness: 5.2, width: 1500 },
    { time: "10:05", temp: 1170, CO2: 0.045, SO2: 0.003, NOx: 0.012, oxygen: 20.5, thickness: 5.1, width: 1498 },
    { time: "10:10", temp: 1180, CO2: 0.05, SO2: 0.004, NOx: 0.015, oxygen: 20.3, thickness: 5.0, width: 1497 },
  ]);

  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        time: new Date().toLocaleTimeString().slice(0, 5),
        temp: Math.random() * 50 + 1100,
        CO2: Math.random() * 0.02 + 0.04,
        SO2: Math.random() * 0.002 + 0.002,
        NOx: Math.random() * 0.005 + 0.01,
        oxygen: Math.random() * 2 + 19,
        thickness: Math.random() * 0.3 + 5.0,
        width: Math.random() * 5 + 1495,
      };

      setData(prevData => [...prevData.slice(-5), newEntry]);

      let newWarnings: string[] = [];
      if (newEntry.temp > 1200) newWarnings.push("🔥 炉温过高，建议降低加热功率！");
      if (newEntry.CO2 > 0.05) newWarnings.push("⚠️ CO₂ 浓度超标，可能需要调整燃烧参数！");
      if (newEntry.NOx > 0.015) newWarnings.push("⚠️ NOx 排放超标，请检查燃烧优化！");
      if (newEntry.oxygen < 19.5) newWarnings.push("⚠️ 氧气浓度过低，可能影响燃烧效率！");
      if (newEntry.thickness < 4.8) newWarnings.push("⚠️ 钢材厚度过薄，调整轧制参数！");
      if (newEntry.width < 1495) newWarnings.push("⚠️ 钢材宽度异常，请检查设备状态！");

      setWarnings(newWarnings);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <h1>📊 智能冶金系统概览</h1>

      {/* 🚨 警告信息 */}
      {warnings.length > 0 && warnings.map((w, index) => <WarningBox key={index}>{w}</WarningBox>)}

      <ChartsContainer>
        {/* 🔥 炉温趋势 */}
        <ChartBox>
          <h3>🔥 炉温趋势</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[1100, 1250]} unit="℃" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={1200} stroke="red" label="🚨 超温" />
              <Line type="monotone" dataKey="temp" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 🌫️ 烟气成分 */}
        <ChartBox>
          <h3>🌫️ 烟气成分</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[0, 0.06]} unit="%" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0.05} stroke="red" label="⚠️ CO₂ 超标" />
              <Line type="monotone" dataKey="CO2" stroke="green" name="CO₂" />
              <Line type="monotone" dataKey="SO2" stroke="yellow" name="SO₂" />
              <Line type="monotone" dataKey="NOx" stroke="blue" name="NOx" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 🍽️ 材料配比（饼图） */}
        <ChartBox>
          <h3>🍽️ 材料配比</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={[
                { name: "废钢", value: 40 },
                { name: "生铁", value: 35 },
                { name: "合金", value: 25 }
              ]} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                <Cell fill="gray" />
                <Cell fill="black" />
                <Cell fill="gold" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 📏 钢材厚度 & 宽度 */}
        <ChartBox>
          <h3>📏 钢材尺寸</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[4.5, 5.5]} unit="mm" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={4.8} stroke="red" label="⚠️ 过薄" />
              <Bar dataKey="thickness" fill="#8884d8" name="厚度" />
              <ReferenceLine y={1495} stroke="red" label="⚠️ 过窄" />
              <Bar dataKey="width" fill="#82ca9d" name="宽度" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsContainer>
    </Container>
  );
}
