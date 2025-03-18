import { useState, useEffect } from "react";
import styled from "styled-components";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer, 
  BarChart, Bar,
} from "recharts";

const Container = styled.div`
  padding: 20px;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ChartRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const ChartBox = styled.div`
  flex: 1;
  min-width: 300px;
  background: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
  color: white;
`;

const SuggestionBox = styled.div`
  background: #333;
  padding: 10px;
  border-radius: 5px;
  color: #ddd;
  margin-top: 10px;
`;

export default function SmartSteel() {
  const [data, setData] = useState([
    { time: "10:00", temp: 1150, pressure: 20, speed: 1.5, thickness: 5.2, width: 1500, co2: 6, so2: 1.5, nox: 1, oxygen: 18 },
    { time: "10:05", temp: 1170, pressure: 22, speed: 1.6, thickness: 5.1, width: 1498, co2: 6.5, so2: 1.8, nox: 1.2, oxygen: 17 },
    { time: "10:10", temp: 1180, pressure: 25, speed: 1.7, thickness: 5.0, width: 1497, co2: 7, so2: 2, nox: 1.5, oxygen: 16 },
  ]);
  
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        time: new Date().toLocaleTimeString().slice(0, 5),
        temp: Math.random() * 50 + 1100,
        pressure: Math.random() * 10 + 20,
        speed: Math.random() * 0.5 + 1.5,
        thickness: Math.random() * 0.3 + 5.0,
        width: Math.random() * 5 + 1495,
        co2: Math.random() * 3 + 5,
        so2: Math.random() * 2 + 1,
        nox: Math.random() * 2 + 0.5,
        oxygen: Math.random() * 5 + 15,
      };

      setData(prevData => [...prevData.slice(-5), newEntry]);

      const { temp, thickness, width, co2, so2, nox, oxygen } = newEntry;
      let newSuggestions: string[] = [];

      if (temp > 1200) newSuggestions.push("🚨 轧制温度过高！降低加热功率。");
      if (thickness < 4.8) newSuggestions.push("⚠️ 钢材厚度过薄！调整轧制参数。");
      if (width < 1495) newSuggestions.push("⚠️ 钢材宽度异常，请检查设备状态。");
      if (co2 > 7) newSuggestions.push("⚠️ CO₂ 超标！检查燃烧状况。");
      if (so2 > 2.5) newSuggestions.push("⚠️ SO₂ 过高！可能影响环境排放标准。");
      if (nox > 2) newSuggestions.push("⚠️ NOx 浓度异常！优化冶炼工艺。");
      if (oxygen < 16) newSuggestions.push("⚠️ 氧气浓度低！可能影响燃烧效率。");

      setSuggestions(newSuggestions);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <h1>🔧 智能炼钢系统</h1>
      <ChartsContainer>
        <ChartBox>
          <h3>🔥 轧制温度趋势</h3>
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

        <ChartBox>
          <h3>🌫️ 烟气成分</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="time" />
              <YAxis unit="%" />
              <Tooltip />
              <Legend />
              <Bar dataKey="oxygen" fill="#4CAF50" name="O₂" />
              <Bar dataKey="co2" fill="#FF5733" name="CO₂" />
              <Bar dataKey="so2" fill="#FFC300" name="SO₂" />
              <Bar dataKey="nox" fill="#C70039" name="NOx" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsContainer>

      <ChartRow>
        <ChartBox>
          <h3>📏 钢材厚度</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[4.5, 5.5]} unit="mm" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={4.8} stroke="red" label="⚠️ 过薄" />
              <Bar dataKey="thickness" fill="#8884d8" name="厚度" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox>
          <h3>📏 钢材宽度</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[1490, 1510]} unit="mm" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={1495} stroke="red" label="⚠️ 过窄" />
              <Bar dataKey="width" fill="#82ca9d" name="宽度" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartRow>

      <h2>⚠️ 生产调整建议</h2>
      {suggestions.map((s, index) => <SuggestionBox key={index}>{s}</SuggestionBox>)}
    </Container>
  );
}
